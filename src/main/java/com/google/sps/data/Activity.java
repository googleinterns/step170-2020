package com.google.sps.data;

import com.google.appengine.api.datastore.Key;

public class Activity {
  private Key id;
  private String name;
  private Category category;
  private String url;


  public static enum Category {
    GAMES, VIDEOS, ARTICLES;
  }

  public Activity(Key id, String name, Category category, String url) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.url = url;
  }

  public Key getId() {
    return id;
  }
  
  public String getName() {
    return name;
  }

  public String getUrl() {
    return url;
  }

  /*
  * Return String representation of activity.
  */
  @Override
  public String toString() {
    return String.format("[%s, %s, %s]", name, category.toString(), url);
  }
}
