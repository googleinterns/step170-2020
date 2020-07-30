package com.google.sps.data;

import java.util.List;

public final class ActivityEvent {
  private String userID;
  private long startTimestamp;
  private long endTimestamp;
  private Activity activity;
  private List<String> guests;

  public ActivityEvent(String userID, long startTimestamp, long endTimestamp, Activity activity, List<String> guests) {
    this.userID = userID;
    this.startTimestamp = startTimestamp;
    this.endTimestamp = endTimestamp;
    this.activity = activity;
    this.guests = guests;
  }

  public String getUserId() {
    return userID;
  }

  public long getStartTimestamp() {
    return startTimestamp;
  }

  public long getEndTimestamp() {
    return endTimestamp;
  }

  public Activity getActivity() {
    return activity;
  }

  public List<String> getGuests() {
    return guests;
  }
}
