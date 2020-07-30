package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.sps.data.ActivityEvent;
import static com.google.sps.data.GeneralUtility.getParameter;
import static com.google.sps.data.EventUtility.getActivityEvent;
import static com.google.sps.data.EventUtility.storeActivityEvent;
import com.google.sps.data.Activity.Category;

import java.util.Map;
import java.util.HashMap;

/** 
* Servlet creates activity event, adds it to the user's calendar, and sends calendar invites to guests.
*/
@WebServlet("/create-event")
public class CreateEventServlet extends HttpServlet {
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    // Get event information
    Map<String, String> eventInfo = getParameters(request);

    ActivityEvent event = getActivityEvent(eventInfo);

    // Store activity event in datastore
    storeActivityEvnet(event);

    // Create calendar event and send invite to guests
  }

  /*
  * Get all the request parameters for the activity event.
  */
  private static Map<String, String> getParameters(HttpServletRequest request) {
    Map<String, String> eventInfo = new HashMap<>();
    String[] paramNames = {"userID", "accessToken", "startTimestamp", "endTimestamp", "activityKey", "guests"};

    for (String paramName : paramNames) {
      String paramValue = getParameter(paramName);
      eventInfo.put(paramName, paramValue);
    }

    return eventInfo;
  }
}
