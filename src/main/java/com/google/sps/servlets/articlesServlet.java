// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.*;
import java.lang.Object;
import java.util.logging.Logger;
import java.util.logging.Level;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSyntaxException;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.sps.data.Article;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.google.cloud.secretmanager.v1.AccessSecretVersionResponse;
import com.google.cloud.secretmanager.v1.SecretManagerServiceClient;
import com.google.cloud.secretmanager.v1.SecretVersionName;

/** 
* This servlet is used to update the database with well-being related activity links.
*/
@WebServlet("/articleLinks")
public class articlesServlet extends HttpServlet {
  private static final String baseURL = "https://newsapi.org/v2/everything?q=relax&sortBy=popularity&apiKey=";
  private static final Logger logger = Logger.getLogger(articlesServlet.class.getName());

  // This method is used to access the api key stored in gcloud secret manager.
  public String accessSecretVersion(String projectId, String secretId, String versionId) throws IOException {
    try (SecretManagerServiceClient client = SecretManagerServiceClient.create()){
      SecretVersionName secretVersionName = SecretVersionName.of(projectId, secretId, versionId);

      // Access the secret version.
      AccessSecretVersionResponse response = client.accessSecretVersion(secretVersionName);

      // Return the secret payload as a string.
      return response.getPayload().getData().toStringUtf8();
    }
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    StringBuilder strBuf = new StringBuilder();  
    HttpURLConnection conn = null;        
    BufferedReader reader = null;

    try {
      // If running on local server use this to get hidden api instead: "URL url = new URL(baseURL + System.getenv("news_api_key"));".
      // Get hidden api key from gcloud secret manager.
      String newsapiKey = accessSecretVersion("298755462", "news_api_key", "1");
      URL url = new URL(baseURL + newsapiKey);
      conn = (HttpURLConnection) url.openConnection();

      conn.setRequestMethod("GET");
      conn.setRequestProperty("Accept", "application/json");

      if (conn.getResponseCode() != HttpURLConnection.HTTP_OK) {
        throw new RuntimeException("HTTP GET Request Failed with Error code : "
          + conn.getResponseCode());
      }
      
      // Using IO Stream with Buffer to increase efficiency.
      reader = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));
      String output = null;

      while ((output = reader.readLine()) != null) {
        strBuf.append(output);
      }
    } catch (MalformedURLException e) {
        response.setContentType("text/html");
        response.getWriter().println("URL is not correctly formatted");
        return;        
    } catch (IOException e) {
        response.setContentType("text/html");
        response.getWriter().println("Cannot retrieve information from provided URL");
        return;
    } finally {
        if (reader != null) {
          try {
            reader.close();
          } catch (IOException e) {
            logger.log(Level.WARNING, e.getMessage());
          }
        }
        if (conn != null) {
          conn.disconnect();
        }
    }

    String articles = strBuf.toString();

    Query query = new Query("Article");
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    for (Entity entity : results.asIterable()) {
      Key articleEntityKey = KeyFactory.createKey("Article", entity.getKey().getId());
      datastore.delete(articleEntityKey);
    }

    JSONObject obj = new JSONObject(articles);
    JSONArray articleData = obj.getJSONArray("articles");
    int numArticles = articleData.length();

    for (int i = 0; i < numArticles; ++i) {
      JSONObject currentArticle = articleData.getJSONObject(i);
      Entity articleEntity = new Entity("Article");

      articleEntity.setProperty("source", currentArticle.getJSONObject("source").getString("name"));
      articleEntity.setProperty("author", currentArticle.getString("author"));
      articleEntity.setProperty("title", currentArticle.getString("title"));
      articleEntity.setProperty("description", currentArticle.getString("description"));
      articleEntity.setProperty("url", currentArticle.getString("url"));
      articleEntity.setProperty("publishedAt", currentArticle.getString("publishedAt"));

      datastore.put(articleEntity);
    }
    
    Gson gson = new Gson();
    String json = gson.toJson(articles);

    response.setContentType("application/json");
    response.getWriter().println(json);
  }

  
  @Override
  public void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
    doGet(request, response);
  }
}
