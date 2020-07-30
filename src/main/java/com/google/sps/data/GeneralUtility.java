package com.google.sps.data;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/*
* This utility class contains general helper methods.
*/
public final class GeneralUtility {

  private GeneralUtility(){}

  /**
  * Retrieves the request parameter, or the default value if the parameter
  * was not specified by the client
  */
  public static String getParameter(HttpServletRequest request, String name, String defaultValue) {
    String value = request.getParameter(name);
    if (value == null) {
      return defaultValue;
    }
    return value;
  }
}
