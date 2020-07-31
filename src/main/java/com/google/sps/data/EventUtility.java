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

  private static final String eventCollectionId = "ActvityEvent";

  /*
  * Store activity event into datastore.
  */
  public static void storeActivityEvent(ActivityEvent event) {
    // Prepare database.
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    Entity eventEntity = new Entity(eventCollectionId);

    // Get all activity event properties.
    String userId = event.getUserId();
    String startTimestamp = new String(event.getStartTimestamp());
    String endTimestamp = new String(event.getEndTimestamp());
    String activityKey = event.getActivity().getKey();
    String guests = String.join(",", event.getGuests());

    // Set the properties into the event entity.
    eventEntity.setProperty("userId", userId);
    eventEntity.setProperty("startTimestamp", startTimestamp);
    eventEntity.setProperty("endTimestamp", endTimestamp);
    eventEntity.setProperty("activityKey", activityKey);
    eventEntity.setProperty("guests", guests);

    datastore.put(eventEntity);
  }

  /*
  * Creates activity event object using event information.
  */
  private static ActivityEvent getActivityEvent(Map<String, String> eventInfo) {
    String userId = eventInfo.get("userId");
    String accessToken = event.get("accessToken");
    long startTimestamp = Long.valueOf(eventInfo.get("startTimestamp"));
    long endTimestamp = Long.valueOf(eventInfo.get("endTimestamp"));
    Activity activity = getActivity(eventInfo.get("activityKey"));
    List<String> guests = getGuests(eventInfo.get("guests"));

    ActivityEvent event = new ActivityEvent(
      userId, accessToken, startTimestamp, endTimestamp, activity, guests
    );

    return event;
  }

  /*
  * Creates activity object using activity information retreived using
  * the datastore activity key.
  */
  private static Activity getActivity(String activityKey) {
    Map<String, String> activityInfo = getActivityInfo(activityKey);
    return new Activity(
      activityInfo.get("key"),
      activityInfo.get("title"),
      Category.valueOf(activityInfo.get("category").toUpperCase()),
      activityInfo.get("url")
    );
  }

  /*
  * Retrieves activity information from datastore using specified activity key.
  * Activity information includes the name, url, and category.
  */
  public static Map<String, String> getActivityInfo(String activityKey) {
    // Prepare database.
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    // Retrieve activity entity with specified key.
    Entity activityEntity = datastore.get(activityKey);

    final String[] activityProperties = {"title", "category", "url"};
    Map<String, String> activityMap = new HashMap<>();

    // Retrieves each activity property from entity and puts it into activity map.
    for (String activityProperty : activityProperties) {
      activityMap.put(activityProperty, activityEntity.getProperty(activityProperty));
    }

    activityMap.put("key", activityEntity.getKey());

    return activityMap;
  }

  private static List<String> getGuests(String guests) {
    return new ArrayList<String>(guests.split(","));
  }
}
