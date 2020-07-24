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

import java.util.ArrayList;
import java.net.URL;

/** A well-being related article that will be displayed */
public final class Article {

  private final ArrayList<String> source;
  private final String author;
  private final String title;
  private final String description;
  private final URL url;
  private final String publishedAt;

  public Article(ArrayList<String> source, String author, String title, 
    String description, URL url, String publishedAt) {
    this.source = source;
    this.author = author;
    this.title = title;
    this.description = description;
    this.url = url;
    this.publishedAt = publishedAt;
  }
}