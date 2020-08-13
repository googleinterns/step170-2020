package com.google.sps.servlets;

import com.google.appengine.api.datastore.*;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.google.sps.data.Article;
import org.json.JSONObject;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;

public class getArticlesServletTest {

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
  public void doGetWithoutAnyArticlesInMockDataStore() throws Exception {
    HttpServletRequest request = mock(HttpServletRequest.class);
    HttpServletResponse response = mock(HttpServletResponse.class);

    String json = "[]\n";

    //These lines mock response.getWriter()
    StringWriter stringWriter = new StringWriter();
    PrintWriter writer = new PrintWriter(stringWriter);
    when(response.getWriter()).thenReturn(writer);

    //invoke doGet method of servelet
    new getArticlesServlet().doGet(request, response);

    //verify that request was never accessed
    verify(request, never()).getParameter(anyString());

    //flush the writer response
    writer.flush();

    assertEquals(json, stringWriter.toString());
}

  @Test
  public void doGetWithOneArticleInMockDataStore() throws Exception {
    HttpServletRequest request = mock(HttpServletRequest.class);
    HttpServletResponse response = mock(HttpServletResponse.class);

    DatastoreService ds = DatastoreServiceFactory.getDatastoreService();

    Entity articleEntity = new Entity("Article");
    articleEntity.setProperty("publisher", "testPublisher");
    articleEntity.setProperty("author", "testAuthor");
    articleEntity.setProperty("title", "testTitle");
    articleEntity.setProperty("description", "testDescription");
    articleEntity.setProperty("url", "testUrl");
    articleEntity.setProperty("publishedAt", "testPublishedAt");

    ds.put(articleEntity);
    String entityKey = KeyFactory.createKeyString(articleEntity.getKey().getKind(), articleEntity.getKey().getId());

    String json = "[{\"publisher\":\"testPublisher\",\"author\":\"testAuthor\",\"description\":\"testDescription\",\"publishedAt\":\"testPublishedAt\",\"key\":\"" +
            entityKey +
            "\",\"title\":\"testTitle\",\"category\":\"ARTICLES\",\"url\":\"testUrl\"}]\n";

    //These lines mock response.getWriter()
    StringWriter stringWriter = new StringWriter();
    PrintWriter writer = new PrintWriter(stringWriter);
    when(response.getWriter()).thenReturn(writer);

    //invoke doGet method of servelet
    new getArticlesServlet().doGet(request, response);

    //verify that request was never accessed
    verify(request, never()).getParameter(anyString());

    //flush the writer response
    writer.flush();

    assertEquals(json, stringWriter.toString());
  }

  @Test
  public void doPut() throws Exception {
    HttpServletRequest request = mock(HttpServletRequest.class);
    HttpServletResponse response = mock(HttpServletResponse.class);

    //These lines mock response.getWriter()
    StringWriter stringWriter = new StringWriter();
    PrintWriter writer = new PrintWriter(stringWriter);
    when(response.getWriter()).thenReturn(writer);

    new getArticlesServlet().doPut(request, response);

    //verify that request was never accessed
    verify(request, never()).getParameter(anyString());

    //flush the writer response
    writer.flush();

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    Query query = new Query("Article");
    PreparedQuery results = datastore.prepare(query);

    List<Article> articles = new ArrayList<>();

    for (Entity entity : results.asIterable()) {
      String entityKey = KeyFactory.createKeyString(entity.getKey().getKind(), entity.getKey().getId());
      String publisher = (String) entity.getProperty("publisher");
      String author = (String) entity.getProperty("author");
      String title = (String) entity.getProperty("title");
      String description = (String) entity.getProperty("description");
      String url = (String) entity.getProperty("url");
      String publishedAt = (String) entity.getProperty("publishedAt");

      Article newArticle = new Article(entityKey, publisher, author, title, description, url, publishedAt);
      articles.add(newArticle);
    }

    assertNotNull(articles);

  }
}