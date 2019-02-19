var url = "api/name_list_get";

// Start a web call. Specify:
// URL
// Data to pass (nothing in this case)
// Function to call when we are done
$.getJSON(url, null, function (jsonResult) {
        // json_result is an object. You can set a breakpoint, or print
        // it to see the fields. Specifically, it is an array of objects.
        // Here we loop the array and print the first name.
        updateTable(jsonResult)
    }
);

function updateTable(jsonData){
    var myTable = $("#datatable tr:last");
    for(var i = 0; i < jsonData.length; i++){

        var formatPhone = jsonData[i].phone;
        formatPhone  = formatPhone.substring(0, 3) + "-" + formatPhone.substring(3, 6) + "-" + formatPhone.substring(6, 10);
        myTable.after("<tr><td>" + jsonData[i].id + "</td><td>" + jsonData[i].first + "</td><td>" + jsonData[i].last + "</td><td>" + jsonData[i].email + "</td><td>" + formatPhone + "</td><td>" + jsonData[i].birthday + "</td></tr>");
    }

}

function showDialogAdd() {
    // Print that we got here
    console.log("Opening add item dialog");

    // Clear out the values in the form.
    // Otherwise we'll keep values from when we last
    // opened or hit edit.
    // I'm getting it started, you can finish.
    $('#id').val("");
    $('#firstName').val("");
    $('#firstName').removeClass("is-valid is-invalid");
    $('#lastName').val("");
    $('#lastName').removeClass("is-valid is-invalid");

    $('#email').val("");
    $('#email').removeClass("is-valid is-invalid");

    $('#phoneNumber').val("");
    $('#phoneNumber').removeClass("is-valid is-invalid");


    $('#birthday').val("");
    $('#birthday').removeClass("is-valid is-invalid");



    // Show the hidden dialog
    $('#myModal').modal('show');
}

var addItemButton =  $('#addItem');
addItemButton.on("click", showDialogAdd);

var saveChangesButton = $('#saveChanges');
saveChangesButton.on("click", saveChanges);

function saveChanges() {
    var validateFirstName = $('#firstName').val();
    var regFirstName = /^[a-zA-Z'é]{2,45}$/;

    if (regFirstName.test(validateFirstName)){
        $('#firstName').removeClass("is-invalid");
        $('#firstName').addClass("is-valid");
    } else{
        $('#firstName').removeClass("is-valid");
        $('#firstName').addClass("is-invalid");
    }

    var validateLastName = $('#lastName').val();
    var regLastName = /^[a-zA-Z'é]{2,45}$/;

    if (regLastName.test(validateLastName)){
        $('#lastName').removeClass("is-invalid");
        $('#lastName').addClass("is-valid");
    } else{
        $('#lastName').removeClass("is-valid");
        $('#lastName').addClass("is-invalid");
    }

    var validateEmail = $('#email').val();
    var regEmail = /^[a-zA-z]{1,127}@[a-zA-z.]{1,127}.(com|net|edu)$/;

    if (regEmail.test(validateEmail)){
        $('#email').removeClass("is-invalid");
        $('#email').addClass("is-valid");

    } else{
        $('#email').removeClass("is-valid");
        $('#email').addClass("is-invalid");
    }

    var validatePhone = $('#phoneNumber').val();
    var regPhone = /^([0-9]{3}-[0-9]{3}-[0-9]{4}|[0-9]{10})$/;

    if (regPhone.test(validatePhone)){
        $('#phoneNumber').removeClass("is-invalid");
        $('#phoneNumber').addClass("is-valid");
    } else{
        $('#phoneNumber').removeClass("is-valid");
        $('#phoneNumber').addClass("is-invalid");
    }

    var validateDate = $('#birthday').val();
    var regDate = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

    if (regDate.test(validateDate)){
        $('#birthday').removeClass("is-invalid");
        $('#birthday').addClass("is-valid");
    } else{
        $('#birthday').removeClass("is-valid");
        $('#birthday').addClass("is-invalid");
    }

}

