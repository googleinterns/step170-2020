package com.google.sps.servlets;

import static org.mockito.Mockito.*;
import static org.junit.Assert.*;

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.*;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.google.sps.data.Game;
import com.google.sps.data.GetServletsUtility;
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

public class getGamesServletTest {

  private final LocalServiceTestHelper helper = new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());
  private final HttpServletRequest request = mock(HttpServletRequest.class);
  private final HttpServletResponse response = mock(HttpServletResponse.class);
  private final DatastoreService ds = DatastoreServiceFactory.getDatastoreService();
  private final String kind = new String("Game");

  @Before
  public void setUp() {
    helper.setUp();
  }

  @After
  public void tearDown() {
    helper.tearDown();
  }

  @Test
  public void doGetWithoutAnyGamesInMockDataStore() throws Exception {

    String json = "[]\n";

    //These lines mock response.getWriter()
    StringWriter stringWriter = new StringWriter();
    PrintWriter writer = new PrintWriter(stringWriter);
    when(response.getWriter()).thenReturn(writer);

    //invoke doGet method of servelet
    new getGamesServlet().doGet(request, response);

    //verify that request was never accessed
    verify(request, never()).getParameter(anyString());

    //flush the writer response
    writer.flush();

    assertEquals(json, stringWriter.toString());
  }

  @Test
  public void doGetWithOneGameInMockDataStore() throws Exception {

    Entity gameEntity = new Entity("Game");
    gameEntity.setProperty("title", "testTitle");
    gameEntity.setProperty("description", "testDescription");
    gameEntity.setProperty("notes", "testNotes");
    gameEntity.setProperty("url", "testURL");
    gameEntity.setProperty("minPlayer", "testMinPlayer");
    gameEntity.setProperty("maxPlayer", "testMaxPlayer");

    ds.put(gameEntity);
    String entityKey = KeyFactory.createKeyString(gameEntity.getKey().getKind(), gameEntity.getKey().getId());

    String json = "[{\"description\":\"testDescription\",\"notes\":\"testNotes\",\"minPlayer\":\"testMinPlayer\",\"maxPlayer\":\"testMaxPlayer\",\"key\":\"" +
            entityKey +
            "\",\"title\":\"testTitle\",\"category\":\"GAMES\",\"url\":\"testURL\"}]\n";

    //These lines mock response.getWriter()
    StringWriter stringWriter = new StringWriter();
    PrintWriter writer = new PrintWriter(stringWriter);
    when(response.getWriter()).thenReturn(writer);

    //invoke doGet method of servelet
    new getGamesServlet().doGet(request, response);

    //verify that request was never accessed
    verify(request, never()).getParameter(anyString());

    //flush the writer response
    writer.flush();

    assertEquals(json, stringWriter.toString());
  }

  @Test
  public void gettingGamesFromApiTest() throws Exception {

    List<Game> games = new ArrayList<>();

    // Stubbing the request to not fail while calling the servlet. 
    when(request.getHeader("User-Agent")).thenReturn("AppEngine-Google; (+http://code.google.com/appengine)");   
    
    //calling the servlet
    new getGamesServlet().doPut(request, response);

    //verify that request was never accessed
    verify(request, never()).getParameter(anyString());

    Query query = new Query(kind);
    PreparedQuery results = ds.prepare(query);
    
    for (Entity entity : results.asIterable()) {
      String entityKey = KeyFactory.createKeyString(entity.getKey().getKind(), entity.getKey().getId());
      String title = (String) entity.getProperty("title");
      String description = (String) entity.getProperty("description");
      String notes = (String) entity.getProperty("notes");
      String url = (String) entity.getProperty("url");
      String minPlayer = (String) entity.getProperty("minPlayer");
      String maxPlayer = (String) entity.getProperty("maxPlayer");

      Game newGame = new Game(entityKey, title, description, notes, url, minPlayer, maxPlayer);
      games.add(newGame);
    }

    // After calling the API, the size of games can never be zero. 
    assertNotEquals(0,games.size());

  }

  @Test
  public void deleteResultsOfGamesFromDatastoreTest() throws Exception {

    Entity gameEntity = new Entity("Game");
    gameEntity.setProperty("title", "testTitle");
    gameEntity.setProperty("description", "testDescription");
    gameEntity.setProperty("notes", "testNotes");
    gameEntity.setProperty("url", "testURL");
    gameEntity.setProperty("minPlayer", "testMinPlayer");
    gameEntity.setProperty("maxPlayer", "testMaxPlayer");

    Entity gameEntity1 = new Entity("Game");
    gameEntity1.setProperty("title", "testTitle1");
    gameEntity1.setProperty("description", "testDescription1");
    gameEntity1.setProperty("notes", "testNotes1");
    gameEntity1.setProperty("url", "testURL1");
    gameEntity1.setProperty("minPlayer", "testMinPlayer1");
    gameEntity1.setProperty("maxPlayer", "testMaxPlayer1");
    
    // Adding two entities to our mock datastore
    ds.put(gameEntity);
    ds.put(gameEntity1);

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
