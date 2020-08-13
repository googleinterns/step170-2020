package com.google.sps.servlets;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
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
  public void gettingArticlesFromApiTest() throws Exception {
    HttpServletRequest request = mock(HttpServletRequest.class);
    HttpServletResponse response = mock(HttpServletResponse.class);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    List<Article> articles = new ArrayList<>();

    // Make sure that the size of articles is initially zero before calling the servlet.
    assertEquals(0,articles.size());

    //calling the servlet
    new getArticlesServlet().doPut(request, response);

    //verify that request was never accessed
    verify(request, never()).getParameter(anyString());

    Query query = new Query("Article");
    PreparedQuery results = datastore.prepare(query);
    
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

    // After calling the API, the size of articles can never be zero. 
    assertNotEquals(0,articles.size());

  }

  @Test
  public void deleteResultsOfArticlesFromDatastoreTest() throws Exception {

    //mocking response and request to pass to servlet.
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

    Entity articleEntity1 = new Entity("Article");
    articleEntity1.setProperty("publisher", "testPublisher2");
    articleEntity1.setProperty("author", "testAuthor2");
    articleEntity1.setProperty("title", "testTitle2");
    articleEntity1.setProperty("description", "testDescription2");
    articleEntity1.setProperty("url", "testUrl2");
    articleEntity1.setProperty("publishedAt", "testPublishedAt2");
    
    // Adding two entities to our mock datastore
    ds.put(articleEntity);
    ds.put(articleEntity1);

    Query query = new Query("Article");
    PreparedQuery results = ds.prepare(query);

    // Checking if the datastore has these two entities. 
    assertEquals(2,results.countEntities());

    // Calling a function, that given a query and datastore, deletes all the entities of that kind from the datastore.
    getArticlesServlet.deleteResultsOfQueryFromDatastore(query,ds);

    // Size is zero since all entities are deleted.
    assertEquals(0,ds.prepare(query).countEntities());
  }
}
