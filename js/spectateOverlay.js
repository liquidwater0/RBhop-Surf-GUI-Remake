export { spectateOverlay, spectateOverlayElement };

import { spectate, stopSpectating } from "./spectate.js";
import { playerListPlayers, getPlayerInfo } from "./playerList.js";

const spectateOverlayElement = document.getElementById("spectateOverlay");

function spectateOverlay() {
    const previousPlayerButton = document.getElementById("spectatePreviousButton");
    const nextPlayerButton = document.getElementById("spectateNextButton");
    const stopSpectatingButton = document.getElementById("stopSpectatingButton");

    previousPlayerButton.addEventListener("click", spectatePrevious);
    nextPlayerButton.addEventListener("click", spectateNext);
    stopSpectatingButton.addEventListener("click", stopSpectating);

    let currentPlayerIndex = 0;
    let player = getPlayerInfo(playerListPlayers[currentPlayerIndex]);

    function getPlayerIndex() {
        playerListPlayers.forEach((player, index) => {
            const spectatedPlayer = document.querySelector("[data-spectating]");
            if (player === spectatedPlayer) currentPlayerIndex = index;
        });
    }

    function getPlayer() {
        if (currentPlayerIndex < 0) {
            currentPlayerIndex = 0;
            return;
        }

        if (currentPlayerIndex > playerListPlayers.length - 1) {
            currentPlayerIndex = playerListPlayers.length - 1;
            return;
        }

        player = getPlayerInfo(playerListPlayers[currentPlayerIndex]);
    }

    function spectatePrevious() {
        getPlayerIndex();

        currentPlayerIndex = currentPlayerIndex - 1;

        getPlayer();
        spectate(player);
    }

    function spectateNext() {
        getPlayerIndex();

        currentPlayerIndex = currentPlayerIndex + 1;
        
        getPlayer();
        spectate(player);
    }
}
