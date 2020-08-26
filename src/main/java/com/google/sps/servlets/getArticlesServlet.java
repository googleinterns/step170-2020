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
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.*;
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
import com.google.sps.data.GetServletsUtility;
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
import com.google.sps.servlets.getSecretKey;
import com.google.sps.servlets.getStringFromAPI;

/** 
* This servlet is used to update the database with well-being related activity links.
*/
@WebServlet("/articleData")
public class getArticlesServlet extends HttpServlet {
  private static final String baseURL = "https://newsapi.org/v2/everything?q=relax&sortBy=popularity&apiKey=";
  private static final Logger logger = Logger.getLogger(getArticlesServlet.class.getName());
  private static final String KIND = new String("Article");

  @Override
  public void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Security: prevent access of doPut from console. 
    if (!request.getHeader("User-Agent").equals("AppEngine-Google; (+http://code.google.com/appengine)")) {
      response.setContentType("text/html");
      response.getWriter().println("Permission denied");
      return;
    }

    // Deletes queries from last doPut so the datastore results can be updated.
    Query query = new Query(KIND);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    GetServletsUtility.deleteResultsOfQueryFromDatastore(query, datastore,KIND);

    // Get string from api.
    String newsapiKey = getSecretKey.accessSecretVersion("298755462", "news_api_key", "1");
    URL url = new URL(baseURL + newsapiKey);
    String articles = getStringFromAPI.getStringFromAPIMethod(url, null, null, logger, request, response);
    if (articles == null) return; // Returns if exception caught.  

    // Put data from api string into database.
    JSONObject obj = new JSONObject(articles);
    JSONArray articleData = obj.getJSONArray("articles");
    int numArticles = articleData.length();

    for (int i = 0; i < numArticles; ++i) {
      JSONObject currentArticle = articleData.getJSONObject(i);
      Entity articleEntity = new Entity(KIND);

      // Get length of content.
      String content = currentArticle.getString("content");
      String contentTruncatedNum = content.substring(203, (content.length()-7)); 
      int contentLength = 200 + Integer.parseInt(contentTruncatedNum);

      articleEntity.setProperty("publisher", currentArticle.getJSONObject("source").getString("name"));
      articleEntity.setProperty("author", currentArticle.getString("author"));
      articleEntity.setProperty("title", currentArticle.getString("title"));
      articleEntity.setProperty("description", currentArticle.getString("description"));
      articleEntity.setProperty("url", currentArticle.getString("url"));
      articleEntity.setProperty("publishedAt", currentArticle.getString("publishedAt"));
      articleEntity.setProperty("length", contentLength);

      datastore.put(articleEntity);
    }
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Query query = new Query(KIND);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    List<Article> articles = new ArrayList<Article>();

    for (Entity entity : results.asIterable()) {
      String entityKey = KeyFactory.createKeyString(entity.getKey().getKind(), entity.getKey().getId());
      String publisher = (String) entity.getProperty("publisher");
      String author = (String) entity.getProperty("author");
      String title = (String) entity.getProperty("title");
      String description = (String) entity.getProperty("description");
      String url = (String) entity.getProperty("url");
      String publishedAt = (String) entity.getProperty("publishedAt");
      long length = (long) entity.getProperty("length");

      Article newArticle = new Article(entityKey, publisher, author, title, description, url, publishedAt, length);
      articles.add(newArticle);
    }

    Gson gson = new Gson();
    String json = gson.toJson(articles);

    response.setContentType("application/json");
    response.getWriter().println(json);
  }
}
