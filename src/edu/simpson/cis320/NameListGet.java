package edu.simpson.cis320;

import java.io.IOException;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import com.google.gson.Gson;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "NameListGet")
public class NameListGet extends javax.servlet.http.HttpServlet {
    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {

    }

    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        // Type of output (HTML, JSON, image, whatever
        response.setContentType("text/plain");
        // Get an object that can write to the network
        PrintWriter out = response.getWriter();
        // Write to the network
        List <Person> peopleList = PersonDAO.getPeople();

        Gson gson = new Gson();

        String json = gson.toJson(peopleList);

        out.println(json);



    }
}
