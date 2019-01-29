function hello() {
    console.log("Hello.");
}

function add() {
    var firstNumber = $('#field1').val();
    var secondNumber = $('#field2').val();
    var addedNumbers = parseInt(firstNumber) + parseInt(secondNumber);
    var thirdNumber = $('#field3');
    thirdNumber.val(addedNumbers);
}

function hide() {
    var paragraph = $('#paragraphToHide');

    if(paragraph.is(":visible")){
        paragraph.hide();
    }
    else {
        paragraph.show();
    }
}

function verify() {
    var phoneNumber = $('#phoneField').val();

    // Create the regular expression
    var reg = /^\d{3}-\d{3}-\d{4}$/;

    // Test the regular expression to see if there is a match
    if (reg.test(phoneNumber)) {
        console.log("OK");
    }
    else {
        console.log("Bad");
    }

}

function jsonFunction() {

    var formObject = {};

    formObject.firstName = $('#firstName').val();
    formObject.lastName = $('#lastName').val();
    formObject.email = $('#email').val();


    var jsonString = JSON.stringify(formObject);

    console.log(jsonString);
}

var formButton1 = $('#button1');
formButton1.on("click", hello);

var formButton2 = $('#button2');
formButton2.on("click", add);

var formButton3 = $('#button3');
formButton3.on("click", hide);

var formButton4 = $('#button4');
formButton4.on("click", verify);

var formButton5 = $('#button5');
formButton5.on("click", jsonFunction);