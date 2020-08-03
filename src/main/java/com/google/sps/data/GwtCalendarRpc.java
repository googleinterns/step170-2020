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
import com.google.gwt.user.server.rpc.RemoteServiceServlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Calendar GWT RPC service implementation.
*/
@SuppressWarnings("serial")
public class GwtCalendarRpc extends RemoteServiceServlet {

  public List<GwtCalendar> getCalendars() throws IOException {
    try {
      com.google.api.services.calendar.Calendar client = CalendarUtility.loadCalendarClient();
      com.google.api.services.calendar.Calendar.CalendarList.List listRequest =
          client.calendarList().list();
      listRequest.setFields("items(id,summary)");
      CalendarList feed = listRequest.execute();
      ArrayList<GwtCalendar> result = new ArrayList<GwtCalendar>();
      if (feed.getItems() != null) {
        for (CalendarListEntry entry : feed.getItems()) {
          result.add(new GwtCalendar(entry.getId(), entry.getSummary()));
        }
      }
      return result;
    } catch (IOException e) {
      throw CalendarUtility.wrappedIOException(e);
    }
  }

  public void delete(GwtCalendar calendar) throws IOException {
    try {
      com.google.api.services.calendar.Calendar client = CalendarUtility.loadCalendarClient();
      client.calendars().delete(calendar.getId()).execute();
    } catch (IOException e) {
      throw CalendarUtility.wrappedIOException(e);
    }
  }

  public GwtCalendar insert(GwtCalendar calendar) throws IOException {
    try {
      Calendar newCalendar = new Calendar().setSummary(calendar.getTitle());
      com.google.api.services.calendar.Calendar client = CalendarUtility.loadCalendarClient();
      Calendar responseEntry = client.calendars().insert(newCalendar).execute();

      String title = responseEntry.getSummary();
      String id = responseEntry.getId();
      return new GwtCalendar(id, title);
    } catch (IOException e) {
      throw CalendarUtility.wrappedIOException(e);
    }
  }

  public GwtCalendar update(GwtCalendar updated) throws IOException {
    try {
      com.google.api.services.calendar.Calendar client = CalendarUtility.loadCalendarClient();
      Calendar entry = new Calendar();
      entry.setSummary(updated.getTitle());
      String id = updated.getId();
      Calendar responseEntry = client.calendars().patch(id, entry).execute();
      return new GwtCalendar(id, responseEntry.getSummary());
    } catch (IOException e) {
      throw CalendarUtility.wrappedIOException(e);
    }
  }
}
