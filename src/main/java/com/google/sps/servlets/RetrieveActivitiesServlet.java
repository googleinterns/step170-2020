package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import com.google.sps.data.Activity;
import com.google.sps.data.Activity.Category;

import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;

/** 
* Servlet that retrieves actvities of a specified category.
*/
@WebServlet("/retrieve-activities")
public class RetrieveActivitiesServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Category activityCategory = getActivityCategory(request);
    List<Activity> activities;

    switch(activityCategory) {
      case GAMES: {
        activities = getGames();
        break;
      }
      case VIDEOS: {
        activities = getVideos();
        break;
      }       
      case ARTICLES: {
        activities = getArticles();
        break;
      }
      default: {
        activities = new ArrayList<Activity>();
        break;
      }
    }

    // Convert activity list to json string
    String activitiesJson = new Gson().toJson(activities);

    response.setContentType("application/json;");
    response.getWriter().println(activitiesJson);
  }

  /**
  * Retrieves type of activity from request parameters.
  */
  private static Category getActivityCategory(HttpServletRequest request) {
    String name = "activity-type", defaultValue = "";
    String activityType = getParameter(request, name, defaultValue);
    Category activityCategory = null;

    try {
      activityCategory = Category.valueOf(activityType.toUpperCase());
    } catch(IllegalArgumentException exception) {
      System.out.println("The specified activity type was either not defined or it's invalid.");
    }
    return activityCategory;
  }

  private static List<Activity> getGames() {
    List<Activity> games = Arrays.asList(
      new Activity("Pictionary", Category.GAMES, "www.pictionary.com"),
      new Activity("Spy Master", Category.GAMES, "www.spymaster.com"),
      new Activity("Skribbl", Category.GAMES, "www.skribbl.io")
    );

    return games;
  }

  private static List<Activity> getVideos() {
    List<Activity> videos = Arrays.asList(
      new Activity("Meditation for Anxiety", Category.VIDEOS, "https://www.youtube.com/watch?v=4pLUleLdwY4"),
      new Activity("Restorative Yoga and Meditation", Category.VIDEOS, "https://www.youtube.com/watch?v=LI6RwT0ulDk"),
      new Activity("Zumba Workout", Category.VIDEOS, "https://www.youtube.com/watch?v=-VXhoeaxxi0")
    );

    return videos;
  }

  private static List<Activity> getArticles() {
    List<Activity> articles = Arrays.asList(
      new Activity("How to Improve Your Psychological Well-Being", Category.ARTICLES, 
        "https://www.verywellmind.com/improve-psychological-well-being-4177330"),
      new Activity("How to Know if Zen Meditation Is Right for You", Category.ARTICLES, 
        "https://www.verywellmind.com/what-is-zen-meditation-4586721"),
      new Activity("What Is the Negativity Bias?", Category.ARTICLES, 
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
