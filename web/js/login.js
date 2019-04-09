// This calls our back-end Java program that sets our session info
function login() {

    var url = "api/login_servlet";
    console.log("doing login");
    // Grab data from the HTML form
    var loginId = $("#loginId").val();

    // Create a JSON request based on that data
    var dataToServer = {loginId : loginId};

    // Post
    $.post(url, dataToServer, function (dataFromServer) {
        // We are done. Write a message to our console
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        // Clear the form
        $("#loginId").val("");
        getLogin()
    });
}

// This gets session info from our back-end servlet.
function getLogin() {

    var url = "api/get_login_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Finished calling servlet.");
        // Update the HTML with our result

        dataFromServer = dataFromServer.trim("");
        console.log(dataFromServer);

        if(dataFromServer === "null"){
            $('#logOutSection').hide();
            $('#getLoginResult').html("");

        }
        else{
            if($('#logOutSection').is(":visible")){
                $('#getLoginResult').html(dataFromServer);
            }
            else {
                $('#logOutSection').show();
                $('#getLoginResult').html(dataFromServer);
            }
        }

    });
}

// This method calls the servlet that invalidates our session
function logout() {

    var url = "api/logout_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
    });
    getLogin()
}

// Hook the functions above to our buttons
button = $('#getLogin');
button.on("click", getLogin);

button = $('#loginServlet');
button.on("click", login);

button = $('#logOut');
button.on("click", logout);

getLogin();

