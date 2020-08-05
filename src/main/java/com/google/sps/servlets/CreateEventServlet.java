package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.api.services.calendar.model.Event;

import com.google.sps.data.ActivityEvent;
import static com.google.sps.data.GeneralUtility.getParameter;
import static com.google.sps.data.EventUtility.getActivityEvent;
import static com.google.sps.data.EventUtility.storeActivityEvent;
import com.google.sps.data.Activity.Category;

import java.util.Map;
import java.util.HashMap;

import com.google.sps.data.GwtCalendarRpc;

/**
* Servlet creates activity event, adds it to the user's calendar, and sends calendar invites to guests.
*/
@WebServlet("/createEvent")
public class CreateEventServlet extends HttpServlet {

  /**
  * Requests are expected to have userId, accessToken, startTimestamp, endTimestamp, activityKey, and guests parameters.
  */
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    // Get event information
    Map<String, String> eventInfo = getParameters(request);
    ActivityEvent event = getActivityEvent(eventInfo);

    // Create calendar event and send invite to guests
    GwtCalendarRpc calendar = new GwtCalendarRpc();
    Event insertedEvent = calendar.insertEvent(event, eventInfo.get("accessToken"));

    // Store activity event in datastore
    storeActivityEvent(event, insertedEvent.getId());

    response.setContentType("text/plain");
    response.getWriter().println(insertedEvent.getHtmlLink());
  }

  /*
  * Get all the request parameters for the activity event.
  */
  private static Map<String, String> getParameters(HttpServletRequest request) {
    Map<String, String> eventInfo = new HashMap<>();
    String[] paramNames = new String[]{"userId", "accessToken", "title", "startTimestamp", "endTimestamp", "activityKey", "guests"};

    for (String paramName : paramNames) {
      String paramValue = request.getParameter(paramName);
      eventInfo.put(paramName, paramValue);
    }

    return eventInfo;
  }
}
