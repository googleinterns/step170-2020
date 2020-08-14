package com.google.sps.data;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

// This class is to be used by the other three servlets to delete entities from datastore.
public class DeleteAllFromDatastore {

  /*
   *  @param query to get results 
   *  @param datastore entities are stored here
   *  @param kind the kind of the entity
  */
  public static void deleteResultsOfQueryFromDatastore(Query query, DatastoreService datastore, String kind) {
    
    PreparedQuery results = datastore.prepare(query);

    for (Entity entity : results.asIterable()) {
      Key EntityKey = KeyFactory.createKey(kind, entity.getKey().getId());
      datastore.delete(EntityKey);
    }
  }
}
