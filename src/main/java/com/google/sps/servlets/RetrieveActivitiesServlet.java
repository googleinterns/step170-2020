package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import com.google.sps.data.Activity;

import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;

/** 
* Servlet that retrieves actvities of a specified category.
*/
@WebServlet("/retrieve-activities")
public class RetrieveActivitiesServlet extends HttpServlet {
  private static final String GAMES_CATEGORY = "games";
  private static final String VIDEOS_CATEGORY = "videos";
  private static final String ARTICLES_CATEGORY = "articles";

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String activityType = getActivityType(request);
    List<Activity> activities;

    switch(activityType) {
      case GAMES_CATEGORY:
        activities = getGames();
        break;
      case VIDEOS_CATEGORY:
        activities = getVideos();
        break;
      case ARTICLES_CATEGORY:
        activities = getArticles();
        break;
      default:
        activities = null;
        break;
    }

    // Convert activity list to json string
    String activitiesJson = new Gson().toJson(activities);

    response.setContentType("application/json;");
    response.getWriter().println(activitiesJson);
  }

  /**
  * Retrieves type of activity from request parameters.
  */
  private static String getActivityType(HttpServletRequest request) {
    String name = "activity-type", defaultValue = "";
    return getParameter(request, name, defaultValue);
  }

  private static List<Activity> getGames() {
    List<Activity> games = Arrays.asList(
      new Activity("Pictionary", GAMES_CATEGORY, "www.pictionary.com"),
      new Activity("Spy Master", GAMES_CATEGORY, "www.spymaster.com"),
      new Activity("Skribbl", GAMES_CATEGORY, "www.skribbl.io")
    );

    return games;
  }

  private static List<Activity> getVideos() {
    List<Activity> videos = Arrays.asList(
      new Activity("Meditation for Anxiety", VIDEOS_CATEGORY, "https://www.youtube.com/watch?v=4pLUleLdwY4"),
      new Activity("Restorative Yoga and Meditation", VIDEOS_CATEGORY, "https://www.youtube.com/watch?v=LI6RwT0ulDk"),
      new Activity("Zumba Workout", VIDEOS_CATEGORY, "https://www.youtube.com/watch?v=-VXhoeaxxi0")
    );

    return videos;
  }

  private static List<Activity> getArticles() {
    List<Activity> articles = Arrays.asList(
      new Activity("How to Improve Your Psychological Well-Being", ARTICLES_CATEGORY, 
        "https://www.verywellmind.com/improve-psychological-well-being-4177330"),
      new Activity("How to Know if Zen Meditation Is Right for You", ARTICLES_CATEGORY, 
        "https://www.verywellmind.com/what-is-zen-meditation-4586721"),
      new Activity("What Is the Negativity Bias?", ARTICLES_CATEGORY, 
        "https://www.verywellmind.com/negative-bias-4589618")
    );

    return articles;
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
