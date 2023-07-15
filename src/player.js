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
    player = new Player(1, 10, 50, 20, "Dracula", "Vampire Lord", "../img/dracula.png");
    displayPlayer(player)
}

function displayPlayer(player) {
    $("." + player.name).remove(); // remove any previous instances
    var playerDiv = $("<div class='player'></div>");
    playerDiv.addClass(player.name);
    var image = $("<img>").attr("src", player.imageUrl);
    playerDiv.append(image);
    var cell = board.children().eq(player.position)
    cell.append(playerDiv);
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

        if (player.position == amountOfCells - 1) {
            // remove contents of last child of the board (so last cell`)
            board.children().eq(-1).children().remove();
            alert("You win!")
        }
        displayPlayer(player)
    }
});