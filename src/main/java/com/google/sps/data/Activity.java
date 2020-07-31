package com.google.sps.data;

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

public class Activity {
  private final Key key;
  private final String title;
  private final Category category;
  private final String url;

  public static enum Category {
    GAMES, VIDEOS, ARTICLES;
  }

  public Activity(Key key, String title, Category category, String url) {
    this.key = key;
    this.title = title;
    this.category = category;
    this.url = url;
  }

  // Getters
  public String getKey() {
    return KeyFactory.keyToString(key);
  }

  public String getTitle() {
    return title;
  }

  public Category getCategory() {
    return category;
  }

  public String getUrl() {
    return url;
  }

  /*
  * Return String representation of activity.
  */
  @Override
  public String toString() {
    return String.format("[%s, %s, %s, %s]",
      KeyFactory.keyToString(key), title, category.toString(), url);
  }
}
