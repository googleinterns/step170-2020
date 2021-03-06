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

package com.google.sps.data;

import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import static org.junit.Assert.assertEquals;

import com.google.appengine.api.datastore.*;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;

import static com.google.sps.data.EventUtility.storeActivityEvent;
import static com.google.sps.data.EventUtility.getGuests;
import com.google.sps.data.Activity;
import com.google.sps.data.ActivityEvent;

import java.util.Map;
import java.util.HashMap;

@RunWith(JUnit4.class)
public final class StoreActivityEventToDatastoreTest {
  private final LocalServiceTestHelper helper = new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());

  @Before
  public void setUp() {
    helper.setUp();
  }

  @After
  public void tearDown() {
    helper.tearDown();
  }

  @Test
  public void storeActivityEventToDatastoreTest() {
    // Set activity event properties into a map.
    Map<String, String> activityEventProperties = new HashMap<>();
    activityEventProperties.put("userId", "userId");
    activityEventProperties.put("title", "title");
    activityEventProperties.put("startTimestamp", "1597418784908");
    activityEventProperties.put("endTimestamp", "1597418784908");
    activityEventProperties.put("activityKey", "activityKey");
    activityEventProperties.put("guests", "guest1,guest2,guest3");
    activityEventProperties.put("eventId", "eventId");

    // Create an event using property map.
    ActivityEvent event = new ActivityEvent(
      activityEventProperties.get("userId"),
      activityEventProperties.get("title"),
      Long.valueOf(activityEventProperties.get("startTimestamp")),
      Long.valueOf(activityEventProperties.get("endTimestamp")),
      new Activity(activityEventProperties.get("activityKey"), "", null, ""),
      getGuests(activityEventProperties.get("guests"))
    );

    // Store activity event into datastore.
    storeActivityEvent(event, activityEventProperties.get("eventId"));

    // Check if datastore has activity event along with all assigned properties.
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    Query activityEventQuery = new Query("ActvityEvent");
    PreparedQuery results = datastore.prepare(activityEventQuery);

    // Check if datastore successfully added activity event.
    assertEquals(1,results.countEntities());

    // Retrieve the single activity event entity.
    Entity activityEvent = 	results.asSingleEntity();

    // Check if the entity has all the assigned properties
    for (String key : activityEventProperties.keySet())
      assertEquals(activityEventProperties.get(key), activityEvent.getProperty(key));
  }
}
