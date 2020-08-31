package com.google.sps.servlets;

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

public class getStringFromAPI extends HttpServlet {
  // This method returns the string output from the api url passed in and returns null if exception caught.
  public static String getStringFromAPIMethod(URL url, HttpURLConnection conn, BufferedReader reader, 
    Logger logger, HttpServletRequest request, HttpServletResponse response) throws IOException {

    StringBuilder strBuf = new StringBuilder();
      
    try {
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
        return null; // Returns null if exception caught. 
    } catch (IOException e) {
        response.setContentType("text/html");
        response.getWriter().println("Cannot retrieve information from provided URL");
        return null; // Returns null if exception caught.
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
    return strBuf.toString();
  }
}
