package edu.simpson.cis320;

import javax.naming.Context;
import java.sql.Connection;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.InitialContext;
import javax.sql.DataSource;

public class DBHelper {
    private final static Logger log = Logger.getLogger(DBHelper.class.getName());

    public static Connection getConnection() {
        try {
            log.log(Level.FINE, "Getting a database connection");

            // Create a context. Uses context.xml
            Context initContext = new InitialContext();

            // Select which context to lookup.
            Context envContext = (Context) initContext.lookup("java:/comp/env");

            // Grab a source of database connection. Note how this matches the name
            // field in context.xml.
            DataSource ds = (DataSource) envContext.lookup("jdbc/cis320");

            // Hey, now we've got a datasource for connections. Let's get a connection.
            Connection conn = ds.getConnection();
            return conn;
        }
        catch(Exception e) {
            // Whoops, something bad happened. Log it.
            log.log(Level.SEVERE, "Unable to get a database connection.", e);
            return null;
        }
    }
}