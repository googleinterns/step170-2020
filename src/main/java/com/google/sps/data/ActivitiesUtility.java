package com.google.sps.data;

import com.google.sps.data.Activity.Category;

import java.util.List;
import java.util.Arrays;

public final class ActivitiesUtility {

  private ActivitiesUtility(){}

  public static List<Activity> getActivities(Category category) {
    if (category.equals(Category.GAMES))
      return getGames();
    else if (category.equals(Category.VIDEOS))
      return getVideos();
    else if (category.equals(Category.ARTICLES))
      return getArticles();
    else
      return null;
  }

  private static List<Activity> getGames() {
    List<Activity> games = Arrays.asList(
      new Activity("Pictionary", Category.GAMES, "www.pictionary.com"),
      new Activity("Spy Master", Category.GAMES, "www.spymaster.com"),
      new Activity("Skribbl", Category.GAMES, "www.skribbl.io")
    );

    return games;
  }

  private static List<Activity> getVideos() {
    List<Activity> videos = Arrays.asList(
      new Activity("Meditation for Anxiety", Category.VIDEOS, "https://www.youtube.com/watch?v=4pLUleLdwY4"),
      new Activity("Restorative Yoga and Meditation", Category.VIDEOS, "https://www.youtube.com/watch?v=LI6RwT0ulDk"),
      new Activity("Zumba Workout", Category.VIDEOS, "https://www.youtube.com/watch?v=-VXhoeaxxi0")
    );

    return videos;
  }

  private static List<Activity> getArticles() {
    List<Activity> articles = Arrays.asList(
      new Activity("How to Improve Your Psychological Well-Being", Category.ARTICLES, 
        "https://www.verywellmind.com/improve-psychological-well-being-4177330"),
      new Activity("How to Know if Zen Meditation Is Right for You", Category.ARTICLES, 
        "https://www.verywellmind.com/what-is-zen-meditation-4586721"),
      new Activity("What Is the Negativity Bias?", Category.ARTICLES, 
        "https://www.verywellmind.com/negative-bias-4589618")
    );

    return articles;
  }
}
