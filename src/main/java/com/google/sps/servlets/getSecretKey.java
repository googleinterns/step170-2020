package com.google.sps.servlets;

import java.lang.*;
import com.google.cloud.secretmanager.v1.AccessSecretVersionResponse;
import com.google.cloud.secretmanager.v1.SecretManagerServiceClient;
import com.google.cloud.secretmanager.v1.SecretVersionName;
import java.io.IOException;

/** 
* This class contains the code for getting the secret key from secret manager.
*/
public class getSecretKey {

  // This method is used to access the api key stored in gcloud secret manager.
  public static String accessSecretVersion(String projectId, String secretId, String versionId) throws IOException {
    try (SecretManagerServiceClient client = SecretManagerServiceClient.create()){
      SecretVersionName secretVersionName = SecretVersionName.of(projectId, secretId, versionId);

      // Access the secret version.
      AccessSecretVersionResponse response = client.accessSecretVersion(secretVersionName);

      // Return the secret payload as a string.
      return response.getPayload().getData().toStringUtf8();
    }
  }
}
