package com.google.sps.servlets;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.*;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.google.sps.data.Video;
import com.google.sps.data.GetServletsUtility;
import com.google.sps.servlets.getSecretKey;
import com.google.sps.servlets.getStringFromAPI;
import org.json.JSONObject;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

public class getVideosServletTest {

  private final LocalServiceTestHelper helper = new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());
  private final HttpServletRequest request = mock(HttpServletRequest.class);
  private final HttpServletResponse response = mock(HttpServletResponse.class);
  private final DatastoreService ds = DatastoreServiceFactory.getDatastoreService();
  private final String kind = new String("Video");

  @Before
  public void setUp() {
    helper.setUp();
  }

  @After
  public void tearDown() {
    helper.tearDown();
  }

  @Test
  public void doGetWithoutAnyVideosInMockDataStore() throws Exception {
    
    String json = "[]\n";

    //These lines mock response.getWriter()
    StringWriter stringWriter = new StringWriter();
    PrintWriter writer = new PrintWriter(stringWriter);
    when(response.getWriter()).thenReturn(writer);

    //invoke doGet method of servelet
    new getVideosServlet().doGet(request, response);

    //verify that request was never accessed
    verify(request, never()).getParameter(anyString());

    //flush the writer response
    writer.flush();

    assertEquals(json, stringWriter.toString());
}

  @Test
  public void doGetWithOneVideoInMockDataStore() throws Exception {

    Entity videoEntity = new Entity("Video");
    videoEntity.setProperty("url", "testURL");
    videoEntity.setProperty("creator", "testCreator");
    videoEntity.setProperty("title", "testTitle");
    videoEntity.setProperty("publishedAt", "testPublishedAt");
    videoEntity.setProperty("videoCategory", "testVideoCategory");
    videoEntity.setProperty("duration", 0);

    ds.put(videoEntity);
    String entityKey = KeyFactory.createKeyString(videoEntity.getKey().getKind(), videoEntity.getKey().getId());

    String json = "[{\"creator\":\"testCreator\",\"publishedAt\":\"testPublishedAt\",\"videoCategory\":\"testVideoCategory\",\"duration\":0,\"key\":\"" 
        + entityKey + "\",\"title\":\"testTitle\",\"category\":\"VIDEOS\",\"url\":\"testURL\"}]\n";

    //These lines mock response.getWriter()
    StringWriter stringWriter = new StringWriter();
    PrintWriter writer = new PrintWriter(stringWriter);
    when(response.getWriter()).thenReturn(writer);

    //invoke doGet method of servelet
    new getVideosServlet().doGet(request, response);

    //verify that request was never accessed
    verify(request, never()).getParameter(anyString());

    //flush the writer response
    writer.flush();

    assertEquals(json, stringWriter.toString());
  }

  @Test
  public void gettingVideosFromApiTest() throws Exception {

    List<Video> videos = new ArrayList<>();

    // Stubbing the request to not fail while calling the servlet. 
    when(request.getHeader("User-Agent")).thenReturn("AppEngine-Google; (+http://code.google.com/appengine)");   

    //calling the servlet
    new getVideosServlet().doPut(request, response);

    //verify that request was never accessed
    verify(request, never()).getParameter(anyString());

    Query query = new Query(kind);
    PreparedQuery results = ds.prepare(query);
    
    for (Entity entity : results.asIterable()) {
      String entityKey = KeyFactory.createKeyString(entity.getKey().getKind(), entity.getKey().getId());
      String url = (String) entity.getProperty("url");
      String creator = (String) entity.getProperty("creator");
      String title = (String) entity.getProperty("title");
      String publishedAt = (String) entity.getProperty("publishedAt");
      String videoCategory = (String) entity.getProperty("videoCategory");
      long duration = (long) entity.getProperty("duration");

      Video newVideo = new Video(entityKey, title, creator, url, publishedAt, videoCategory, duration);
      videos.add(newVideo);
    }

    // After calling the API, the size of videos can never be zero. 
    assertNotEquals(0,videos.size());

  }

  @Test
  public void deleteResultsOfVideosFromDatastoreTest() throws Exception {

    Entity videoEntity = new Entity("Video");
    videoEntity.setProperty("url", "testURL");
    videoEntity.setProperty("creator", "testCreator");
    videoEntity.setProperty("title", "testTitle");
    videoEntity.setProperty("publishedAt", "testPublishedAt");
    videoEntity.setProperty("videoCategory", "testVideoCategory");
    videoEntity.setProperty("duration", 0);

    Entity videoEntity1 = new Entity("Video");
    videoEntity1.setProperty("url", "testURL1");
    videoEntity1.setProperty("creator", "testCreator1");
    videoEntity1.setProperty("title", "testTitle1");
    videoEntity1.setProperty("publishedAt", "testPublishedAt1");
    videoEntity.setProperty("videoCategory", "testVideoCategory1");
    videoEntity.setProperty("duration", 1);
    
    // Adding two entities to our mock datastore
    ds.put(videoEntity);
    ds.put(videoEntity1);

    Query query = new Query(kind);
    PreparedQuery results = ds.prepare(query);

    // Checking if the datastore has these two entities. 
    assertEquals(2,results.countEntities());

    // Calling a function, that given a query and datastore, deletes all the entities of that kind from the datastore.
    GetServletsUtility.deleteResultsOfQueryFromDatastore(query, ds,kind);

    // Size is zero since all entities are deleted.
    assertEquals(0,ds.prepare(query).countEntities());
  }
}