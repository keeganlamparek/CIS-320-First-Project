var url = "api/name_list_get";

// Start a web call. Specify:
// URL
// Data to pass (nothing in this case)
// Function to call when we are done
reload();
function reload() {
    $.getJSON(url, null, function (jsonResult) {
            // json_result is an object. You can set a breakpoint, or print
            // it to see the fields. Specifically, it is an array of objects.
            // Here we loop the array and print the first name.
            updateTable(jsonResult)
        }
    );
}
function updateTable(jsonData){
    $(".removeable").remove();
    var myTable = $("#datatable tr:last");

    for(var i = 0; i < jsonData.length; i++){

        var formatPhone = jsonData[i].phone;
        formatPhone  = formatPhone.substring(0, 3) + "-" + formatPhone.substring(3, 6) + "-" + formatPhone.substring(6, 10);
        myTable.after("<tr class='removeable'><td>" + jsonData[i].id + "</td><td>" + jsonData[i].first + "</td><td>" + jsonData[i].last + "</td><td>" + jsonData[i].email + "</td><td>" + formatPhone + "</td><td>" + jsonData[i].birthday + "</td></tr>");
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
saveChangesButton.on("click", validateChanges);

function validateChanges() {

    var firstName = $('#firstName');
    var lastName = $('#lastName');
    var email = $('#email');
    var phone = $('#phoneNumber');
    var birthday = $('#birthday');

    var validateFirstName = firstName.val();
    var regFirstName = /^[a-zA-Z'é]{2,45}$/;

    if (regFirstName.test(validateFirstName)){
        firstName.removeClass("is-invalid");
        firstName.addClass("is-valid");
    } else{
        firstName.removeClass("is-valid");
        firstName.addClass("is-invalid");
    }

    var validateLastName = lastName.val();
    var regLastName = /^[a-zA-Z'é]{2,45}$/;

    if (regLastName.test(validateLastName)){
        lastName.removeClass("is-invalid");
        lastName.addClass("is-valid");
    } else{
        lastName.removeClass("is-valid");
        lastName.addClass("is-invalid");
    }

    var validateEmail = email.val();
    var regEmail = /^[a-zA-z]{1,127}@[a-zA-z.]{1,127}.(com|net|edu)$/;

    if (regEmail.test(validateEmail)){
        email.removeClass("is-invalid");
        email.addClass("is-valid");

    } else{
        email.removeClass("is-valid");
        email.addClass("is-invalid");
    }

    var validatePhone = phone.val();
    var regPhone = /^([0-9]{3}-[0-9]{3}-[0-9]{4}|[0-9]{10})$/;

    if (regPhone.test(validatePhone)){
        phone.removeClass("is-invalid");
        phone.addClass("is-valid");
    } else{
        phone.removeClass("is-valid");
        phone.addClass("is-invalid");
    }

    var validateDate = birthday.val();
    var regDate = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

    if (regDate.test(validateDate)){
        birthday.removeClass("is-invalid");
        birthday.addClass("is-valid");
    } else{
        birthday.removeClass("is-valid");
        birthday.addClass("is-invalid");
    }

    if(firstName.hasClass("is-valid") &&  lastName.hasClass("is-valid") &&
        email.hasClass("is-valid") && phone.hasClass("is-valid") && birthday.hasClass("is-valid")){
        var data = {first : firstName.val(),
                last : lastName.val(),
                email: email.val(),
                phone: phone.val(),
                birthday: birthday.val()
        };
        jqueryPostJSONButtonAction(data)

    }



    else{
        console.log("All field must be validated before submitting.")
    }

}

<!-- AJAX Post using JSON data -->
function jqueryPostJSONButtonAction(dataToServer) {

    var url = "api/name_list_edit";

    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(dataToServer),
        success: [function(dataFromServer) {
            reload();
        }],
        contentType: "application/json",
        dataType: 'text' // Could be JSON or whatever too
    });
}

