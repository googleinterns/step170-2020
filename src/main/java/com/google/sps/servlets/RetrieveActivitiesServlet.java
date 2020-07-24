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

    // Get list of activities in specified category
    List<Activity> activities = getActivities(activityCategory);

    

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
    } catch (IllegalArgumentException exception) {
      if (activityType.isEmpty())
        System.out.println("The activity type was not defined.");
      else {
        String errorMsg = String.format("The specified activity type, %s, is invalid.", activityType);
        System.out.println(errorMsg);
      }
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
