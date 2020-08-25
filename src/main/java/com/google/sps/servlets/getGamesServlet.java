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
import com.google.sps.data.GetServletsUtility;
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
import com.google.sps.servlets.getSecretKey;
import com.google.sps.servlets.getStringFromAPI;

/** 
* This servlet is used to update the database with well-being related game activity links.
*/
@WebServlet("/gameData")
public class getGamesServlet extends HttpServlet {
  private static final String baseURL = "https://api.airtable.com/v0/appdlpPF3wZ8scgvw/Imported%20table?api_key=";
  private static final Logger logger = Logger.getLogger(getGamesServlet.class.getName());
  private static final String KIND = new String("Game");

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
    String airtableapiKey = getSecretKey.accessSecretVersion("298755462", "airtable_api_key", "1");
    URL url = new URL(baseURL + airtableapiKey); 
    String games = getStringFromAPI.getStringFromAPIMethod(url, null, null, logger, request, response);
    if (games == null) return; // Returns if exception caught.

    // Put data from api string into database.
    JSONObject obj = new JSONObject(games);
    JSONArray gameData = obj.getJSONArray("records");
    int numGames = gameData.length();

    for (int i = 0; i < numGames; ++i) {
      JSONObject currentGame = gameData.getJSONObject(i);
      Entity gameEntity = new Entity(KIND);
      
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
    Query query = new Query(KIND);

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
