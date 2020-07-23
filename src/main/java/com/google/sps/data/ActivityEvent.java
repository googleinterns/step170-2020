package com.google.sps.data;

import java.util.List;

public class ActivityEvent {
  private String userID;
  private long timestamp;
  private Activity activity;
  private List<String> guests;

  public ActivityEvent(String userID, long timestamp, Activity activity, List<String> guests) {
    this.userID = userID;
    this.timestamp = timestamp;
    this.activity = activity;
    this.guests = guests;
  }
}
