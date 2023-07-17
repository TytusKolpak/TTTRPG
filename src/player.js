var gameOver, farmerCellNumber, farmerCell, turn, werewolfCellNumberArray = [];
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
    var initialPosition = Math.floor(Math.random() * amountOfCells);
    player = new Player(initialPosition, 10, 50, 20, "Dracula", "Vampire Lord", "../img/dracula.png");
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
    werewolfCellNumberArray.push(werewolfCellNumber);
    werewolfCell = board.children().eq(werewolfCellNumber)
    var werewolf = $("<img class='werewolf'>").attr("src", "../img/werewolf.png");
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

function checkGameOverConditions() {

    if (player.position == farmerCellNumber & !gameOver) {
        // First empty and only then show the message
        farmerCell.empty().promise().then(() => {
            alert("You win! Game over.");
            gameOver = true;
        });
    }

    if (gameMode === "newEntity") {
        if (werewolfCellNumberArray.includes(player.position) & !gameOver) {
            player = null
            $(".player").empty().promise().then(() => {
                alert("You lose! Game over.");
                gameOver = true;
            });
        }
    }

    if (gameMode === "movement") {
        if (werewolfCellNumber == player.position & !gameOver) {
            player = null
            $(".player").empty().promise().then(() => {
                alert("You lose! Game over.");
                gameOver = true;
            });
        }
    }
}

function addEntities() {
    addPlayer();
    addFarmer();
    addWerewolf();
}

function newWerewolfAppears(numberOfAppearances) {
    for (let i = 0; i < numberOfAppearances; i++) {
        // Create a Werewolf on random cell
        var werewolfCellNumber = Math.floor(Math.random() * amountOfCells);
        werewolfCellNumberArray.push(werewolfCellNumber);
        werewolfCell = board.children().eq(werewolfCellNumber)
        var werewolf = $("<img class='werewolf'>").attr("src", "../img/werewolf.png");
        $(werewolfCell).append(werewolf);
    }
}

function werewolfMoves() {
    // Create a Werewolf on random cell
    $(".werewolf").remove();

    // Difference in their positions
    diff = werewolfCellNumber - player.position
    console.log("werewolf", werewolfCellNumber, "player", player.position, "diff", werewolfCellNumber - player.position);

    // Move towards player

    if (diff > columns) {
        // Go up
        werewolfCellNumber -= columns;
    } else if (diff < columns & diff > 0) {
        // Go left
        werewolfCellNumber -= 1;
    } else if (diff > -columns) {
        // Go right
        werewolfCellNumber += 1;
    } else {
        // Go down
        werewolfCellNumber += columns;
    }

    werewolfCell = board.children().eq(werewolfCellNumber)
    var werewolf = $("<img class='werewolf'>").attr("src", "../img/werewolf.png");
    $(werewolfCell).append(werewolf);
}