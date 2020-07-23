package com.google.sps.servlets;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import java.io.IOException;
import com.google.gson.Gson;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/getUrl")
public class GetUrlServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json"); 
    UserService userService = UserServiceFactory.getUserService();
    Gson gson = new Gson();

    if (userService.isUserLoggedIn()) {
    //String userEmail = userService.getCurrentUser().getEmail();
    String urlToRedirectToAfterUserLogsOut = "/";
    String logoutUrl = userService.createLogoutURL(urlToRedirectToAfterUserLogsOut);  // Prepares the url that when clicked logs the user out. 
    String json = gson.toJson(logoutUrl);
    response.getWriter().println(json);   // This sends the URL when reached logs the user out.

    } else {
    String urlToRedirectToAfterUserLogsIn = "/";
    String loginUrl = userService.createLoginURL(urlToRedirectToAfterUserLogsIn);
    String json = gson.toJson(loginUrl);
    response.getWriter().println(json);   // This sens the URl when reached gives the sign in page of google. 
    }
    }
  }
