package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

// This class is to be used by the other three servlets to delete entities from datastore.
public class DeleteAllFromDatastoreUtility {

  /*
   * This function takes the query, kind, and datastore and deletes all the entities that match with the query and kind from the datastore.
   *  @param query to get results 
   *  @param datastore entities are stored here
   *  @param kind the kind of the entity
   *  The datastore will not have entities od kind @kind after this function runs. 
  */
  public static void deleteResultsOfQueryFromDatastore(Query query, DatastoreService datastore, String kind) {
    
    PreparedQuery results = datastore.prepare(query);

    for (Entity entity : results.asIterable()) {
      Key EntityKey = KeyFactory.createKey(kind, entity.getKey().getId());
      datastore.delete(EntityKey);
    }
  }
}
