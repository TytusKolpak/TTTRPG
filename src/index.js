function processValue() {
    // Clear previous state of cells displayed
    $(".grid-container").empty();

    // Number of times to add the div elements
    var amountOfCells = parseInt(document.getElementById("numericInput").value);

    // Creating these elements
    for (var i = 1; i <= amountOfCells; i++) {
        var div = $("<div class='rc'></div>");
        div.text(i);
        $(".grid-container").append(div);
    }

    // Now we want to arrange them into a shape that's as close to a square as possible. We do that by winding square root of the number of elements and then round it up so that we will always get more rows/columns than necessary. We also assume that there will be more columns than rows.
    // Examples: sqrt 20=4.47 => 5 x 5-1. sqrt 10=3.16 =>4 x 4-1. 
    // By getting the rounded up value X we can generate a css property of grid-template-columns with value as auto repeated X times.

    var autos = "";
    var columns = Math.ceil(Math.sqrt(amountOfCells));

    // Generate property's value of correct length 
    for (let i = 0; i < columns; i++) {
        autos += "auto ";
    }

    // Apply styles
    $(".grid-container").css("grid-template-columns", autos);
}