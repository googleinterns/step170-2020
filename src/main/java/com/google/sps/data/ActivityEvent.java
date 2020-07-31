package com.google.sps.data;

import java.util.List;

public final class ActivityEvent {
  private final String userId;
  private final String accessToken;
  private final long startTimestamp;
  private final long endTimestamp;
  private final Activity activity;
  private final List<String> guests;

  public ActivityEvent(String userId, String accessToken, long startTimestamp, long endTimestamp, Activity activity, List<String> guests) {
    this.userId = userId;
    this.accessToken = accessToken;
    this.startTimestamp = startTimestamp;
    this.endTimestamp = endTimestamp;
    this.activity = activity;
    this.guests = guests;
  }

  // Getters
  public String getUserId() {
    return userId;
  }

  public String getAccessToken() {
    return accessToken;
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
