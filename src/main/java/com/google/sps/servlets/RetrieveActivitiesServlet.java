package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import com.google.sps.data.Activity;
import com.google.sps.data.Activity.Category;
import static com.google.sps.data.ActivitiesUtility.getActivities;

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
        activities = getActivities(Category.GAMES);
        break;
      }
      case VIDEOS: {
        activities = getActivities(Category.VIDEOS);
        break;
      }       
      case ARTICLES: {
        activities = getActivities(Category.ARTICLES);
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
