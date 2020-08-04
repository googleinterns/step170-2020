package com.google.sps.data;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.EntityNotFoundException;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.Arrays;

/*
* This utility class contains helper methods relating to storing
* events in datastore and creating calendar events.
*/
public final class EventUtility {

  private EventUtility(){}

  private static final String eventCollectionId = "ActvityEvent";

  /*
  * Store activity event into datastore.
  */
  public static void storeActivityEvent(ActivityEvent event, String calendarEventId) {
    // Prepare database.
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    Entity eventEntity = new Entity(eventCollectionId);

    // Get all activity event properties.
    String userId = event.getUserId();
    String startTimestamp = new Long(event.getStartTimestamp()).toString();
    String endTimestamp = new Long(event.getEndTimestamp()).toString();
    String activityKey = event.getActivity().getKey();
    String guests = String.join(",", event.getGuests());

    // Set the properties into the event entity.
    eventEntity.setProperty("userId", userId);
    eventEntity.setProperty("startTimestamp", startTimestamp);
    eventEntity.setProperty("endTimestamp", endTimestamp);
    eventEntity.setProperty("activityKey", activityKey);
    eventEntity.setProperty("guests", guests);
    eventEntity.setProperty("eventId", calendarEventId);

    datastore.put(eventEntity);
  }

  /*
  * Creates activity event object using event information.
  */
  public static ActivityEvent getActivityEvent(Map<String, String> eventInfo) {
    ActivityEvent event = new ActivityEvent(
      eventInfo.get("userId"), Long.valueOf(eventInfo.get("startTimestamp")), Long.valueOf(eventInfo.get("endTimestamp")),
      getActivity(eventInfo.get("activityKey")), getGuests(eventInfo.get("guests")));
    return event;
  }

  /*
  * Creates activity object using activity information retreived using
  * the datastore activity key.
  */
  private static Activity getActivity(String activityKey) {
    // Prepare database.
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    // Retrieve activity entity with specified key.
    Entity activityEntity = null;
    try {
      activityEntity = datastore.get(KeyFactory.stringToKey(activityKey));
    } catch (EntityNotFoundException exception) {
      System.out.println("The entity requested wasn't found.");
    }

    String category = (String) activityEntity.getProperty("category");
    
    return new Activity(
      activityEntity.getKey(),
      (String) activityEntity.getProperty("title"),
      Activity.Category.valueOf(category.toUpperCase()),
      (String) activityEntity.getProperty("url")
    );
  }

  private static List<String> getGuests(String guests) {
    return Arrays.asList(guests.split(","));
  }
}
