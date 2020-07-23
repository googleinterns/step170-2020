package com.google.sps.data;

public class Activity {
  private String name;
  private Category category;
  private String url;

  public enum Category {
    GAMES, VIDEOS, ARTICLES;
  }

  public Activity(String name, Category category, String url) {
    this.name = name;
    this.category = category;
    this.url = url;
  }

  /*
  * Return String representation of activity.
  */
  @Override
  public String toString() {
    return String.format("[%s, %s, %s]", name, category.toString(), url);
  }
}
