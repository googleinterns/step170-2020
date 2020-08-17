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

  private final DatastoreService datastore;

  public EventUtility() {
    datastore = DatastoreServiceFactory.getDatastoreService();
  }

  public EventUtility(DatastoreService datastore) {
    this.datastore = datastore;
  }

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
    String title = event.getTitle();
    String startTimestamp = new Long(event.getStartTimestamp()).toString();
    String endTimestamp = new Long(event.getEndTimestamp()).toString();
    String activityKey = event.getActivity().getKey();
    String guests = String.join(",", event.getGuests());

    // Set the properties into the event entity.
    eventEntity.setProperty("userId", userId);
    eventEntity.setProperty("title", title);
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
  public ActivityEvent getActivityEvent(Map<String, String> eventInfo, Key activityKey) {
    ActivityEvent event = new ActivityEvent(
      eventInfo.get("userId"), eventInfo.get("title"), Long.valueOf(eventInfo.get("startTimestamp")), Long.valueOf(eventInfo.get("endTimestamp")),
      getActivity(activityKey, eventInfo.get("activityKey")), getGuests(eventInfo.get("guests")));
    return event;
  }

  /*
  * Creates activity object using activity information retreived using
  * the datastore activity key.
  */
  public Activity getActivity(Key activityKey, String activityKeyStr) {
    // Retrieve activity entity with specified key.
    Entity activityEntity = null;
    try {
      activityEntity = datastore.get(activityKey);
    } catch (EntityNotFoundException exception) {
      System.out.println("The entity requested wasn't found.");
    }

    String category = activityEntity.getKind() + "s";
    return new Activity(
      activityKeyStr,
      (String) activityEntity.getProperty("title"),
      Activity.Category.valueOf(category.toUpperCase()),
      (String) activityEntity.getProperty("url")
    );
  }

  public static List<String> getGuests(String guests) {
    return Arrays.asList(guests.split(","));
  }
}
