var gameMode, movement;

$("html").keydown((event) => {
    if (player) {
        movement = false;
        if (event.key == "ArrowRight" |
            event.key == "ArrowLeft" |
            event.key == "ArrowUp" |
            event.key == "ArrowDown"
        ) {
            movement = true;
            turn++;
        }
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

        if (movement) {

            checkGameOverConditions();
            player ? displayPlayer(player) : null

            // Done in this fashion to enable further expansion of game modes
            // Depending on game mode choose according werewolf actions
            gameMode === "newEntity" && newWerewolfAppears();
            gameMode === "movement" && werewolfMoves();

        }
    }
});

function handleGameModeChange(selectedMode) {
    console.log("Game mode set to:", selectedMode);
    gameMode = selectedMode
}

// Radio button change event
$('input[name="gameMode"]').change(function () {
    var selectedMode = $('input[name="gameMode"]:checked').val();
    handleGameModeChange(selectedMode);
    $(this).blur(); // Remove focus from the clicked radio button
});