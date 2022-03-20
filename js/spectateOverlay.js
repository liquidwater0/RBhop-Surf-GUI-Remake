export { spectateOverlay, spectateOverlayElement };

import { spectate, stopSpectating } from "./spectate.js";
import { playerListPlayers } from "./playerList.js";

const spectateOverlayElement = document.getElementById("spectateOverlay");

function spectateOverlay() {
    const previousPlayerButton = document.getElementById("spectatePreviousButton");
    const nextPlayerButton = document.getElementById("spectateNextButton");
    const stopSpectatingButton = document.getElementById("stopSpectatingButton");

    previousPlayerButton.addEventListener("click", spectatePrevious);
    nextPlayerButton.addEventListener("click", spectateNext);
    stopSpectatingButton.addEventListener("click", stopSpectating);

    let player;
    let currentPlayerIndex = 0;

    function getPlayer() {
        if (currentPlayerIndex < 0) {
            currentPlayerIndex = 0;
            return;
        }

        if (currentPlayerIndex > playerListPlayers.length - 1) {
            currentPlayerIndex = playerListPlayers.length - 1;
            return;
        }

        const playerPersonalBestElement = playerListPlayers[currentPlayerIndex].children[1];
        const playerPersonalBest = Number(playerPersonalBestElement.getAttribute("data-personal-best"));

        player = {
            name: playerListPlayers[currentPlayerIndex].children[0].textContent,
            style: playerListPlayers[currentPlayerIndex].children[2].textContent,
            personalBest: playerPersonalBest,
            isBot: playerListPlayers[currentPlayerIndex].classList.contains("bot")
        }
    }

    function spectatePrevious() {
        currentPlayerIndex = currentPlayerIndex - 1;

        getPlayer();
        spectate(player);
    }

    function spectateNext() {
        currentPlayerIndex = currentPlayerIndex + 1;
        
        getPlayer();
        spectate(player);
    }
}
