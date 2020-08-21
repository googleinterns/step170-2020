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

import com.google.appengine.api.datastore.Key;
import java.util.ArrayList;
import java.net.URL;

/** A well-being related article that will be displayed */
public final class Video extends Activity {

  private final String creator;
  private final String publishedAt;
  private final long duration;

  public Video(String key, String title, String creator, String url, String publishedAt, long duration) {
    // Initialize activity fields
    super(key, title, Activity.Category.VIDEOS, url);

    this.creator = creator;
    this.publishedAt = publishedAt;
    this.duration = duration;
  }
}
