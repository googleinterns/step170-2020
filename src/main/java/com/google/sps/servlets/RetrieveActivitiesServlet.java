package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.sps.data.Activity;

import java.util.Arrays;
import java.util.List;

@WebServlet("/retrieve-activities")
public class RetrieveActivitiesServlet extends HttpServlet {
  private final String GAMES = "games";
  private final String VIDEOS = "videos";
  private final String ARTICLES = "articles";

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String activityType = getActivityType(request);
    String activityJson;

    switch(activityType) {
      case GAMES:
        activityJson = getGames();
        break;
      case VIDEOS:
        activityJson = getVideos();
        break;
      case ARTICLES:
        activityJson = getArticles();
        break;
      case default:
        activityJson = new String();
        break;
    }

    response.setContentType("application/json;");
    response.getWriter().println(activityJson);
  }

  /**
  * Retrieves type of activity from request parameters.
  */
  private static String getActivityType(HttpServletRequest request) {
    String name = "activity-type", defaultValue = "";
    return getParameter(request, name, defaultValue);
  }

  private static String getGames() {

  }

  private static String getVideos() {

  }

  private static String getArticles() {

  }

  /**
  * Retrieves the request parameter, or the default value if the parameter
  * was not specified by the client
  */
  private static String getParameter(HttpServletRequest request, String name, String defaultValue) {
    String value = request.getParameter(name);
    if (value == null) {
      return defaultValue;
    }
    return value;
  }
}
