package edu.simpson.cis320;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.List;
import java.util.LinkedList;
import java.sql.PreparedStatement;

/**
 * Data Access Object for the Person table/class
 */
public class PersonDAO {
    private final static Logger log = Logger.getLogger(PersonDAO.class.getName());

    /**
     * Get a list of the people in the database.
     * @return Returns a list of instances of the People class.
     */
    public static List<Person> getPeople() {
        log.log(Level.FINE, "Get people");

        // Create an empty linked list to put the people we get from the database into.
        List<Person> list = new LinkedList<Person>();

        // Declare our variables
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        // Databases are unreliable. Use some exception handling
        try {
            // Get our database connection
            conn = DBHelper.getConnection();

            // This is a string that is our SQL query.
            String sql = "SELECT id, first, last, email, phone, birthday FROM person";

            // If you had parameters, it would look something like
            // String sql = "select id, first, last, phone from person where id = ?";

            // Create an object with all the info about our SQL statement to run.
            stmt = conn.prepareStatement(sql);

            // If you had parameters, they would be set wit something like:
            // stmt.setString(1, "1");

            // Execute the SQL and get the results
            rs = stmt.executeQuery();

            // Loop through each record
            while(rs.next()) {
                // Create a new instance of the Person object.
                // You'll need to define that somewhere. Just a simple class with getters and setters on the
                // fields.
                Person person = new Person();

                // Get the data from the result set, and copy it to the Person object
                person.setId(rs.getInt("id"));
                person.setFirst(rs.getString("first"));
                person.setLast(rs.getString("last"));
                person.setEmail(rs.getString("email"));
                person.setPhone((rs.getString("phone")));
                person.setBirthday(rs.getString("birthday"));

                // Add this person to the list so we can return it.
                list.add(person);
            }
        } catch (SQLException se) {
            log.log(Level.SEVERE, "SQL Error", se );
        } catch (Exception e) {
            log.log(Level.SEVERE, "Error", e );
        } finally {
            // Ok, close our result set, statement, and connection
            try { rs.close(); } catch (Exception e) { log.log(Level.SEVERE, "Error", e ); }
            try { stmt.close(); } catch (Exception e) { log.log(Level.SEVERE, "Error", e ); }

            try {
                conn.close();
            } catch (Exception e)
            {
                log.log(Level.SEVERE, "Error", e ); }
        }
        // Done! Return the results
        return list;
    }

}