// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.sps.data.EventUtility;
import com.google.sps.data.Activity;

import com.google.appengine.api.datastore.EntityNotFoundException;

import java.util.Map;
import java.util.HashMap;

@RunWith(JUnit4.class)
public final class EventUtilityTest {

  private static DatastoreService getDatastoreMock(Entity entity) throws EntityNotFoundException {
    // Use mockito to generate a datastore mock.
    DatastoreService datastoreMock = mock(DatastoreService.class);

    // Mock response for getting entity from datastore
    when(datastoreMock.get(any(Key.class))).thenReturn(entity);

    return datastoreMock;
  }

  private static Entity getEntityMock(String type, Map<String, String> properties) throws EntityNotFoundException {
    // Use mockito to generate an entity mock of the specified type.
    Entity entityMock = mock(Entity.class);

    // Set return value for entity kind
    when(entityMock.getKind()).thenReturn(type);

    // Set return value for each entity property
    for (String key : properties.keySet())
      when(entityMock.getProperty(key)).thenReturn(properties.get(key));

    return entityMock;
  }

  private static Key getKeyMock() throws EntityNotFoundException {
    // Use mockito to generate a mock key.
    Key keyMock = mock(Key.class);
    return keyMock;
  }

  private static Activity getTestActivity(String type, String keyStr, Map<String, String> properties) throws EntityNotFoundException {
    // Create a mock key
    Key keyMock = getKeyMock();

    // Create a mock entity of type game
    Entity entityMock = getEntityMock(type, properties);

    // Create datastore mock that returns specified entity
    DatastoreService datastoreMock = getDatastoreMock(entityMock);

    // Get Activity
    EventUtility eventUtility = new EventUtility(datastoreMock);
    Activity activity = eventUtility.getActivity(keyMock, keyStr);

    return activity;
  }

  @Test
  public void testGetGameActivity() throws EntityNotFoundException {
    String type = "game";
    String keyStr = "key";

    // Create map of game entity properties
    Map<String, String> properties = new HashMap<>();
    String title = "game title";
    String url = "game url";
    properties.put("title", title);
    properties.put("url", url);

    Activity activity = getTestActivity(type, keyStr, properties);

    // Check if values are the same
    assertEquals(keyStr, activity.getKey());
    assertEquals(Activity.Category.valueOf("GAMES"), activity.getCategory());
    assertEquals(title, activity.getTitle());
    assertEquals(url, activity.getUrl());
  }

  @Test
  public void testGetVideoActivity() throws EntityNotFoundException {
    String type = "video";
    String keyStr = "key";

    // Create map of game entity properties
    Map<String, String> properties = new HashMap<>();
    String title = "video title";
    String url = "video url";
    properties.put("title", title);
    properties.put("url", url);

    Activity activity = getTestActivity(type, keyStr, properties);

    // Check if values are the same
    assertEquals(keyStr, activity.getKey());
    assertEquals(Activity.Category.valueOf("VIDEOS"), activity.getCategory());
    assertEquals(title, activity.getTitle());
    assertEquals(url, activity.getUrl());
  }

  @Test
  public void testGetArticleActivity() throws EntityNotFoundException {
    String type = "article";
    String keyStr = "key";

    // Create map of game entity properties
    Map<String, String> properties = new HashMap<>();
    String title = "article title";
    String url = "article url";
    properties.put("title", title);
    properties.put("url", url);

    Activity activity = getTestActivity(type, keyStr, properties);

    // Check if values are the same
    assertEquals(keyStr, activity.getKey());
    assertEquals(Activity.Category.valueOf("ARTICLES"), activity.getCategory());
    assertEquals(title, activity.getTitle());
    assertEquals(url, activity.getUrl());
  }
}
