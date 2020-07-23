package com.google.sps.data;

public class Activity {
  private String name;
  private Category type;
  private String url;

  public enum Category {
    GAMES, VIDEOS, ARTICLES;
  }

  public Activity(String name, Category type, String url) {
    this.name = name;
    this.type = type;
    this.url = url;
  }

  /*
  * Return String representation of activity.
  */
  @Override
  public String toString() {
    return String.format("[%s, %s, %s]", name, type.toString(), url);
  }
}
