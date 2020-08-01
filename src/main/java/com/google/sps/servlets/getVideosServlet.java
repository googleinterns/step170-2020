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
import com.google.sps.data.Video;
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
* This servlet is used to update the database with well-being related video activity links.
*/
@WebServlet("/api/videoData")
public class getVideosServlet extends HttpServlet {
  private static final String baseURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&order=viewCount&q=yoga&type=video&key=";
  private static final Logger logger = Logger.getLogger(getVideosServlet.class.getName());

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
  public void doPut (HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Deletes queries from last doPut so the datastore results can be updated.
    Query query = new Query("Video");
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    for (Entity entity : results.asIterable()) {
      Key videoEntityKey = KeyFactory.createKey("Video", entity.getKey().getId());
      datastore.delete(videoEntityKey);
    }

    StringBuilder strBuf = new StringBuilder();  
    HttpURLConnection conn = null;        
    BufferedReader reader = null;

    try {
      // Get hidden api key from gcloud secret manager.
      String youtubeapiKey = accessSecretVersion("298755462", "youtube_api_key", "1");
      URL url = new URL(baseURL + youtubeapiKey);
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

    String videos = strBuf.toString();

    // Formats data using the video entity to be stored in the database.
    JSONObject obj = new JSONObject(videos);
    JSONArray videoData = obj.getJSONArray("items");
    int numVideos = videoData.length();
    
    String videoLinkBaseURL = "https://www.youtube.com/watch?v=";

    for (int i = 0; i < numVideos; ++i) {
      JSONObject currentVideo = videoData.getJSONObject(i);
      Entity videoEntity = new Entity("Video");

      videoEntity.setProperty("url", videoLinkBaseURL + (currentVideo.getJSONObject("id").getString("videoId")));
      videoEntity.setProperty("creator", currentVideo.getJSONObject("snippet").getString("channelTitle"));
      videoEntity.setProperty("title", currentVideo.getJSONObject("snippet").getString("title"));
      videoEntity.setProperty("publishedAt", currentVideo.getJSONObject("snippet").getString("publishedAt"));

      datastore.put(videoEntity);
    }
  }
  
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Query query = new Query("Video");

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    List<Video> videos = new ArrayList<Video>();

    for (Entity entity : results.asIterable()) {
      Key id = entity.getKey();
      String url = (String) entity.getProperty("url");
      String creator = (String) entity.getProperty("creator");
      String title = (String) entity.getProperty("title");
      String publishedAt = (String) entity.getProperty("publishedAt");

      Video newVideo = new Video(id, title, creator, url, publishedAt);
      videos.add(newVideo);
    }

    Gson gson = new Gson();
    String json = gson.toJson(videos);

    response.setContentType("application/json");
    response.getWriter().println(json);
  }
}
