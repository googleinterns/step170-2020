/*
 * Copyright (c) 2010 Google Inc.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */

package com.google.sps.data;

import com.google.api.services.calendar.model.Calendar;
import com.google.api.services.calendar.model.CalendarList;
import com.google.api.services.calendar.model.CalendarListEntry;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.EventDateTime;
import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.model.EventAttendee;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Calendar GWT RPC service implementation.
*/
@SuppressWarnings("serial")
public class GwtCalendarRpc {
  /**
  * Insert activity event into user's calendar.
  */
  public Event insertEvent(ActivityEvent event, String token) throws IOException {
    try {
      String calendarId = "primary";

      // Get start and end times.
      EventDateTime start = new EventDateTime().setDateTime(
        new DateTime(event.getStartTimestamp())
      );
      EventDateTime end = new EventDateTime().setDateTime(
        new DateTime(event.getEndTimestamp())
      );

      // Get attendees list
      List<EventAttendee> attendees = new ArrayList<>();
      for (String attendee: event.getGuests()) {
        attendees.add(new EventAttendee().setEmail(attendee));
      }
      System.out.println("2");
      // Get user calendar service
      com.google.api.services.calendar.Calendar client = CalendarUtility.loadCalendarClient(token);
      System.out.println("8");
      Event insertedEvent = client.events().insert(calendarId, new Event()
        .setSummary(event.getTitle())
        .setDescription(event.getActivity().getUrl())
        .setStart(start)
        .setEnd(end)
        .setAttendees(attendees)
      ).setSendNotifications(true).execute();

      return insertedEvent;
    } catch (IOException e) {
      throw CalendarUtility.wrappedIOException(e);
    }
  }
}
