var url = "api/name_list_get";

// Start a web call. Specify:
// URL
// Data to pass (nothing in this case)
// Function to call when we are done
$.getJSON(url, null, function (jsonResult) {
        // json_result is an object. You can set a breakpoint, or print
        // it to see the fields. Specifically, it is an array of objects.
        // Here we loop the array and print the first name.
        for (var i = 0; i < jsonResult.length; i++) {
            console.log(jsonResult[i].first);
            console.log(jsonResult[i].last);
        }
        console.log("Done");
        updateTable(jsonResult)
    }
);

function updateTable(jsonData){
    var myTable = $("#datatable tr:last");
    for(var i = 0; i < jsonData.length; i++){
        myTable.after("<tr><td>" + jsonData[i].id + "</td><td>" + jsonData[i].first + "</td><td>" + jsonData[i].last + "</td><td>" + jsonData[i].email + "</td><td>" + jsonData[i].phone + "</td><td>" + jsonData[i].birthday + "</td></tr>");
    }

}