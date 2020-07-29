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
import com.google.cloud.secretmanager.v1.AccessSecretVersionResponse;
import com.google.cloud.secretmanager.v1.SecretManagerServiceClient;
import com.google.cloud.secretmanager.v1.SecretVersionName;

/** 
* This servlet is used to update the database with well-being related activity links.
*/
@WebServlet("/gameLinks")
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

      // If running on local server return this line instead: return System.getenv("airtable_api_key");
    }
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
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

    // Formats data to be fetched in js.
    JSONObject obj = new JSONObject(games);
    JSONArray gamesData = obj.getJSONArray("records");
    int numGames = gamesData.length();

    List<Game> gamesArray = new ArrayList<Game>();

    for (int i = 0; i < numGames; ++i) {
      JSONObject currentGame = gamesData.getJSONObject(i);

      String title = currentGame.getJSONObject("fields").getString("title");
      String description = currentGame.getJSONObject("fields").getString("description");
      String notes = currentGame.getJSONObject("fields").getString("notes");
      String url = currentGame.getJSONObject("fields").getString("url");
      String minPlayer = currentGame.getJSONObject("fields").getString("minPlayer");
      String maxPlayer = currentGame.getJSONObject("fields").getString("maxPlayer");

      Game newGame = new Game(title, description, notes, url, minPlayer, maxPlayer);
      gamesArray.add(newGame);
    }

    Gson gson = new Gson();
    String json = gson.toJson(gamesArray);

    response.setContentType("application/json");
    response.getWriter().println(json);
  }
}
