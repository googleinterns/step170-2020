package com.google.sps.data;

public class Activity {
  private String name;
  private String type;
  private String url;

  public Activity(String name, String type, String url) {
    this.name = name;
    this.type = type;
    this.url = url;
  }

  /*
  * Return String representation of comment.
  */
  @Override
  public String toString() {
    return String.format("[%s, %s, %s]", name, type, url);
  }
}
