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

import java.util.Map;
import java.util.HashMap;

/*
* This utility class contains helper methods relating to storing
* events in datastore and creating calendar events.
*/ 
public final class EventUtility {

  private EventUtility(){}

  private static final String eventCollectionID = "ActvityEvent";

  /*
  * Retrieves activity information from datastore using specified activity id.
  * Activity information includes the name, url, and category.
  */
  public static Map<String, String> getActivityInfo(String activityId) {
    // Prepare database
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    // Retrieve activity entity with specified key
    Entity activityEntity = datastore.get(activityId);

    final String[] activityProperties = {"name", "url", "category"};
    Map<String, String> activityMap = new HashMap<>();

    // Retrieves each activity property from entity and puts it into activity map.
    for (String activityProperty : activityProperties) {
      activityMap.put(activityProperty, activityEntity.getProperty(activityProperty));
    }

    activityMap.put("id", activityEntity.getKey());

    return activityMap;
  }

  /*
  * Store activity event into datastore.
  */
  public static void storeActivityEvent(ActivityEvent event) {
    // Prepare database
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    Entity eventEntity = new Entity(eventCollectionID);

    // Get all activity event properties
    String userId = event.getUserId();
    String startTimestamp = new String(event.getStartTimestamp());
    String endTimestamp = new String(event.getEndTimestamp());
    String activityId = event.getActivity().getId();
    String guests = String.join(",", event.getGuests());

    // Set the properties into the event entity
    eventEntity.setProperty("userId", userId);
    eventEntity.setProperty("startTimestamp", startTimestamp);
    eventEntity.setProperty("endTimestamp", endTimestamp);
    eventEntity.setProperty("activityId", activityId);
    eventEntity.setProperty("guests", guests);

    datastore.put(eventEntity);
  }

  /*
  * Creates activity event object using event information.
  */
  private static ActivityEvent getActivityEvent(Map<String, String> eventInfo) {
    String userID = eventInfo.get("userID");
    long startTimestamp = Long.valueOf(eventInfo.get("startTimestamp"));
    long endTimestamp = Long.valueOf(eventInfo.get("endTimestamp"));
    Activity activity = getActivity(eventInfo.get("activityId"));
    List<String> guests = getGuests(eventInfo.get("guests"));

    ActivityEvent event = new ActivityEvent(
      userID, startTimestamp, endTimestamp, activity, guests
    );

    return event;
  }

  /*
  * Creates activity object using activity information retreived using
  * the datastore activity id.
  */
  private static Activity getActivity(String activityId) {
    Map<String, String> activityInfo = getActivityInfo(activityId);
    return new Activity(
      activityInfo.get("id"),
      activityInfo.get("name"),
      Category.valueOf(Activity.activityInfo.get("category").toUpperCase()),
      activityInfo.get("url")
    );
  }

  private static List<String> getGuests(String guests) {
    return new ArrayList<String>(guests.split(","));
  }
}
