var columns, rows, player, amountOfCells;
const board = $(".grid-container");

window.onload = (event) => {
    console.log("page is fully loaded");
    init();
};

window.onresize = () => {
    adjustSizes();
}

function init() {
    //better x by y lol

    var initialMode = $('input[name="gameMode"]:checked').val();
    handleGameModeChange(initialMode);

    amountOfCells = 144;
    turn = 0;
    createBoard(amountOfCells);
    addEntities();
    adjustSizes();
}

function adjustSizes() {
    // Function for adjusting element sizes based on the window size
    var width = board.width();
    var height = board.height();

    // Cells
    const margin = 2 * columns;
    var cellWidth = (width - margin) / columns;
    var cellHeight = (height - margin) / rows;
    $(".rc").css("width", cellWidth)
    $(".rc").css("height", cellHeight)
    // Otherwise the cell will stretch to the img size 512px
}

function createBoard(size) {
    player = null
    amountOfCells;

    // If there was no function call with an argument then use the user provided one
    if (size) {
        amountOfCells = size;
        console.log("Default amount of cells.");
    } else {
        // Number of times to add the div elements
        amountOfCells = parseInt(document.getElementById("numericInput").value);
        if (amountOfCells > 900) {
            alert("Ok, that's too much.")
            return;
        } else {
            console.log("Good amount of cells provided.");
        }
    }

    // Clear previous state of cells displayed
    board.empty();

    // Creating these elements
    for (var i = 1; i <= amountOfCells; i++) {
        var cell = $("<div class='rc'></div>");
        var cellNumberDiv = $("<div class='cellNumber'></div>");
        cellNumberDiv.text(i);
        cell.append(cellNumberDiv);
        board.append(cell);
    }

    // Now we want to arrange them into a shape that's as close to a square as possible. We do that by winding square root of the number of elements and then round it up so that we will always get more rows/columns than necessary. We also assume that there will be more columns than rows.
    // Examples: sqrt 20=4.47 => 5 x 5-1. sqrt 10=3.16 =>4 x 4-1. 
    // By getting the rounded up value X we can generate a css property of grid-template-columns with value as auto repeated X times.

    var autos = "";
    columns = Math.ceil(Math.sqrt(amountOfCells));

    // Determine how many rows are there. Let's assume we have 16 cells then its 4x4. 5x4 for 17,18,19,20 and for 21 we have 5x5 again. This goes up to 25, and for 26 we have 6x5 up to 30, at 31 we have 6x6.
    // It so happens that Math.sqrt(amountOfCells) passes n.5 at the very moment when we add a row.
    var remains = Math.sqrt(amountOfCells) % 1;
    if (remains > 0.5 | remains == 0) {
        // console.log("even");
        rows = columns;
    } else {
        // console.log("odd");
        rows = columns - 1;
    }

    // Generate property's value of correct length 
    for (let i = 0; i < columns; i++) {
        autos += "auto ";
    }

    // Apply styles
    board.css("grid-template-columns", autos);
}