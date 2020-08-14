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

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSyntaxException;
import com.google.sps.data.Game;
import com.google.sps.data.DeleteAllFromDatastore;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.cloud.secretmanager.v1.AccessSecretVersionResponse;
import com.google.cloud.secretmanager.v1.SecretManagerServiceClient;
import com.google.cloud.secretmanager.v1.SecretVersionName;

/** 
* This servlet is used to update the database with well-being related game activity links.
*/
@WebServlet("/gameData")
public class getGamesServlet extends HttpServlet {
  private static final String baseURL = "https://api.airtable.com/v0/appdlpPF3wZ8scgvw/Imported%20table?api_key=";
  private static final Logger logger = Logger.getLogger(getGamesServlet.class.getName());

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
  public void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Deletes queries from last doPut so the datastore results can be updated.
    Query query = new Query("Game");
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    String s = new String("Game");
    DeleteAllFromDatastore.deleteResultsOfQueryFromDatastore(query, datastore,s);

    StringBuilder strBuf = new StringBuilder();  
    HttpURLConnection conn = null;        
    BufferedReader reader = null;

    try {
      // Get hidden api key from gcloud secret manager.
      String airtableapiKey = accessSecretVersion("298755462", "airtable_api_key", "1");
      URL url = new URL(baseURL + airtableapiKey);
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

    String games = strBuf.toString();

    // Formats data using the game entity to be stored in the database.
    JSONObject obj = new JSONObject(games);
    JSONArray gameData = obj.getJSONArray("records");
    int numGames = gameData.length();

    for (int i = 0; i < numGames; ++i) {
      JSONObject currentGame = gameData.getJSONObject(i);
      Entity gameEntity = new Entity("Game");
      
      gameEntity.setProperty("title", currentGame.getJSONObject("fields").getString("title"));
      gameEntity.setProperty("description", currentGame.getJSONObject("fields").getString("description"));
      gameEntity.setProperty("notes", currentGame.getJSONObject("fields").getString("notes"));
      gameEntity.setProperty("url", currentGame.getJSONObject("fields").getString("url"));
      gameEntity.setProperty("minPlayer", currentGame.getJSONObject("fields").getString("minPlayer"));
      gameEntity.setProperty("maxPlayer", currentGame.getJSONObject("fields").getString("maxPlayer"));

      datastore.put(gameEntity);
    }
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Query query = new Query("Game");

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    List<Game> games = new ArrayList<Game>();

    for (Entity entity : results.asIterable()) {
      String entityKey = KeyFactory.createKeyString(entity.getKey().getKind(), entity.getKey().getId());
      String title = (String) entity.getProperty("title");
      String description = (String) entity.getProperty("description");
      String notes = (String) entity.getProperty("notes");
      String url = (String) entity.getProperty("url");
      String minPlayer = (String) entity.getProperty("minPlayer");
      String maxPlayer = (String) entity.getProperty("maxPlayer");

      Game newGame = new Game(entityKey, title, description, notes, url, minPlayer, maxPlayer);
      games.add(newGame);
    }

    Gson gson = new Gson();
    String json = gson.toJson(games);

    response.setContentType("application/json");
    response.getWriter().println(json);
  }
}
