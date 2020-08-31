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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.time.Duration;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
* This servlet is used to update the database with well-being related video activity links.
*/
@WebServlet("/videoData")
public class getVideosServlet extends HttpServlet {
  private static final String baseURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&order=viewCount&q=";
  private static final String contentDetailsURL = "https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=";
  private static final String videoLinkBaseURL = "https://www.youtube.com/watch?v=";
  private static final Logger logger = Logger.getLogger(getVideosServlet.class.getName());
  private static final String KIND = new String("Video");

  private static HashMap<String, String> getVideoStringFromAPI (String youtubeapiKey, ArrayList<String> videoCategoryNames, HashMap<String, String> videoMap, HttpServletRequest request, HttpServletResponse response) throws IOException {
    for (int i = 0; i < videoCategoryNames.size(); ++i) {
      URL url = new URL(baseURL + videoCategoryNames.get(i) + "&type=video&key=" + youtubeapiKey); 
      String videos = getStringFromAPI.getStringFromAPIMethod(url, null, null, logger, request, response);
      if (videos == null) return null; // Returns if exception caught.
      videoMap.put(videoCategoryNames.get(i), videos);
    }
    return videoMap;
  }

  @Override
  public void doPut (HttpServletRequest request, HttpServletResponse response) throws IOException {
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

    // Map to store strings and catagory types.
    HashMap<String, String> videoMap = new HashMap<String, String>();

    // Arraylist to store the types of videos we want to get from youtube.
    ArrayList<String> videoCategoryNames = new ArrayList<String>(Arrays.asList("yoga", "workout", "meditation"));

    // Get yoga, workout, meditation video strings from api.
    String youtubeapiKey = getSecretKey.accessSecretVersion("298755462", "youtube_api_key", "2"); // Get hidden api key from gcloud secret manager. 
    videoMap = getVideoStringFromAPI(youtubeapiKey, videoCategoryNames, videoMap, request, response);
    if (videoMap == null) return; // Return if exception caught.

    // Loop for going through each string, converting to JSON objects, then put in datastore.
    for (Map.Entry<String, String> entry : videoMap.entrySet()) {
      String category = entry.getKey();
      String videos = entry.getValue();

      // Put data from api string into database.
      JSONObject obj = new JSONObject(videos);
      JSONArray videoData = obj.getJSONArray("items");
      int numVideos = videoData.length();

      for (int i = 0; i < numVideos; ++i) {
        JSONObject currentVideo = videoData.getJSONObject(i);
        Entity videoEntity = new Entity(KIND);

        // Get video details from api.
        String videoId = currentVideo.getJSONObject("id").getString("videoId"); // Get videoId.
        URL getContentDetailsURL = new URL(contentDetailsURL + videoId + "&key=" + youtubeapiKey);
        String videoDetails = getStringFromAPI.getStringFromAPIMethod(getContentDetailsURL, null, null, logger, request, response);
        if (videoDetails == null) return; // Returns if exception caught.

        // Get duration from parsed string from api.
        JSONObject videoDetailObj = new JSONObject(videoDetails);
        String duration = videoDetailObj.getJSONArray("items").getJSONObject(0).getJSONObject("contentDetails").getString("duration");

        // Convert duration string into seconds.
        long durationInSeconds = Duration.parse(duration).getSeconds();
      
        videoEntity.setProperty("videoCategory", category);
        videoEntity.setProperty("duration", durationInSeconds);
        videoEntity.setProperty("url", videoLinkBaseURL + videoId);
        videoEntity.setProperty("creator", currentVideo.getJSONObject("snippet").getString("channelTitle"));
        videoEntity.setProperty("title", currentVideo.getJSONObject("snippet").getString("title"));
        videoEntity.setProperty("publishedAt", currentVideo.getJSONObject("snippet").getString("publishedAt"));

        datastore.put(videoEntity);
      }
    }
  }
  
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Query query = new Query(KIND);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    List<Video> videos = new ArrayList<Video>();

    for (Entity entity : results.asIterable()) {
      String entityKey = KeyFactory.createKeyString(entity.getKey().getKind(), entity.getKey().getId());
      String url = (String) entity.getProperty("url");
      String creator = (String) entity.getProperty("creator");
      String title = (String) entity.getProperty("title");
      String publishedAt = (String) entity.getProperty("publishedAt");
      String videoCategory = (String) entity.getProperty("videoCategory");
      long duration = (long) entity.getProperty("duration");

      Video newVideo = new Video(entityKey, title, creator, url, publishedAt, videoCategory, duration);
      videos.add(newVideo);
    }

    Gson gson = new Gson();
    String json = gson.toJson(videos);
    
    response.setContentType("application/json");
    response.getWriter().println(json);
  }
}
