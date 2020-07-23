package com.google.sps.data;

import java.util.List;

public class ActivityEvent {

  private String userID;
  private long timestamp;
  private ActivityType activity;
  private List<String> guests;

  Enum ActivityType {
    GAME, VIDEO;
  }

  public ActivityEvent(String userID, long timestamp, ActivityType activity, List<String> guests) {
    this.userID = userID;
    this.timestamp = timestamp;
    this.activity = activity;
    this.guests = guests;
  }
}
