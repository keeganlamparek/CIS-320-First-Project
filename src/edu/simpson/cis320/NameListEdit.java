package edu.simpson.cis320;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "NameListEdit")
public class NameListEdit extends javax.servlet.http.HttpServlet {

    private Pattern firstNamePattern;
    private Pattern lastNamePattern;
    private Pattern emailPattern;
    private Pattern phonePattern;
    private Pattern birthdayPattern;



    public NameListEdit() {
        firstNamePattern = Pattern.compile("^[a-zA-Z'é]{2,45}$");
        lastNamePattern = Pattern.compile("^[a-zA-Z'é]{2,45}$");
        emailPattern = Pattern.compile("^[a-zA-z]{1,127}@[a-zA-z.]{1,127}.(com|net|edu)$");
        phonePattern = Pattern.compile("^([0-9]{3}-[0-9]{3}-[0-9]{4}|[0-9]{10})$");
        birthdayPattern = Pattern.compile("^[0-9]{4}-[0-9]{2}-[0-9]{2}$");

    }


    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        // You can output in any format, text/JSON, text/HTML, etc. We'll keep it simple
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        // Just confirm we are calling the servlet we think we are
        out.println("JSON Post");

        // Open the request for reading. Read in each line, put it into a string.
        // Yes, I think there should be an easier way.
        java.io.BufferedReader in = request.getReader();
        String requestString = new String();
        for (String line; (line = in.readLine()) != null; requestString += line);

        // Output the string we got as a request, just as a check
        out.println(requestString);

        // Great! Now we want to use GSON to parse the object, and pop it into our business object. Field
        // names have to match. That's the magic.
        Gson gson = new Gson();
        JsonObject root = new Gson().fromJson(requestString, JsonObject.class);


        if (root.has("id")){
            int id = root.get("id").getAsInt();
            Person fromJson = gson.fromJson(requestString, Person.class);
            if (isValid(fromJson)) {
                PersonDAO.updatePerson(fromJson, id);
            }
        }
        else {
            Person fromJson = gson.fromJson(requestString, Person.class);
            if (isValid(fromJson)) {
                PersonDAO.setPeople(fromJson);
            }
        }
    }

    private boolean isValid(Person person){
        Matcher firstNameMatcher = firstNamePattern.matcher(person.getFirst());
        Matcher lastNameMatcher = lastNamePattern.matcher(person.getLast());
        Matcher emailMatcher = emailPattern.matcher(person.getEmail());
        Matcher phoneMatcher = phonePattern.matcher(person.getPhone());
        Matcher birthdayMatcher = birthdayPattern.matcher(person.getBirthday());

        if(firstNameMatcher.find() && lastNameMatcher.find() && emailMatcher.find() && phoneMatcher.find()
                && birthdayMatcher.find()){
            return true;
        }

        else{
            return false;
        }
    }

}
