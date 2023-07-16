var gameOver, farmerCellNumber, farmerCell;
function Player(position, speed, power, range, name, title, imageUrl) {
    this.position = position;
    this.speed = speed;
    this.power = power;
    this.range = range;
    this.name = name;
    this.title = title;
    this.imageUrl = imageUrl;
}

function addPlayer() {
    player = new Player(0, 10, 50, 20, "Dracula", "Vampire Lord", "../img/dracula.png");
    displayPlayer(player)
}

function addFarmer() {
    // Create a Farmer on random cell
    farmerCellNumber = Math.floor(Math.random() * amountOfCells);

    // Somewhere else than player
    if (farmerCellNumber == player.position) {
        farmerCellNumber += 1;
    }
    farmerCell = board.children().eq(farmerCellNumber)
    var farmer = $("<img>").attr("src", "../img/farmer.png");
    $(farmerCell).append(farmer);
}

function addWerewolf() {
    // Create a Werewolf on random cell
    werewolfCellNumber = Math.floor(Math.random() * amountOfCells);

    // Can't be on the same as Werewolf or player
    while (werewolfCellNumber == player.position || werewolfCellNumber == farmerCellNumber) {
        werewolfCellNumber += 1;
    }

    werewolfCell = board.children().eq(werewolfCellNumber)
    var werewolf = $("<img>").attr("src", "../img/werewolf.png");
    $(werewolfCell).append(werewolf);
}

function displayPlayer(player) {
    $("." + player.name).remove(); // remove any previous instances
    var playerDiv = $("<div class='player'></div>");
    playerDiv.addClass(player.name);
    var image = $("<img>").attr("src", player.imageUrl);
    playerDiv.append(image);
    var playerCell = board.children().eq(player.position)
    playerCell.append(playerDiv);
    adjustSizes();
}

$("html").keydown((event) => {
    if (player) {

        switch (event.key) {
            case "ArrowRight":
                if ((player.position + 1) % columns == 0) {
                    console.log("right border");
                } else {
                    player.position += 1;
                }
                break;

            case "ArrowLeft":
                if (player.position % columns == 0) {
                    console.log("left border");
                } else {
                    player.position -= 1;
                }
                break;

            case "ArrowUp":
                if (player.position < columns) {
                    console.log("top border");
                } else {
                    player.position -= columns;
                }
                break;

            case "ArrowDown":
                if (player.position > (amountOfCells - 1 - columns)) {
                    console.log("bottom border")
                } else {
                    player.position += columns;
                }
                break;

            default:
                console.log("No binding.");
                break;
        }
        displayPlayer(player)
        checkGameOverConditions();
    }
});

function checkGameOverConditions() {

    if (player.position == farmerCellNumber & !gameOver) {
        // First empty and only then show the message
        farmerCell.empty().promise().then(() => {
            alert("You win! Game over.");
            gameOver = true;
        });
    }

    if (player.position == werewolfCellNumber & !gameOver) {
        player = null
        $(".player").empty().promise().then(() => {
            alert("You lose! Game over.");
            gameOver = true;
        });
    }
}

function addEntities() {
    addPlayer();
    addFarmer();
    addWerewolf();
}