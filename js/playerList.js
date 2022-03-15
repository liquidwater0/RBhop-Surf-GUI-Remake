export { playerList, yourStyle, yourPersonalBest, playerListPlayers };

import ContextMenu from "./contextMenus.js";
import { settings } from "./menus/settingsMenu.js";
import { formatTime } from "./timer.js";
import { spectate } from "./spectate.js";

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const playerListElement = document.getElementById("playerList");
const playerListPlayers = document.querySelectorAll("#playerList .player:not([data-player])");
const pingElements = document.querySelectorAll("[data-ping]");

const yourPlayer = document.querySelector("#playerList [data-your-player]");
const yourStyle = document.querySelector("#playerList [data-your-style]");
const yourPersonalBest = document.querySelector("#playerList [data-your-personal-best]");

document.addEventListener("keydown", event => {
    if (document.activeElement.tagName == "INPUT") return;

    if (event.key == "Tab") {
        event.preventDefault();
        playerListElement.classList.add("player-list-expanded");
    }
});

document.addEventListener("keyup", event => {
    if (document.activeElement.tagName == "INPUT") return;
    
    if (event.key == "Tab") {
        event.preventDefault();
        playerListElement.classList.remove("player-list-expanded");
    }
});

function playerList() {
    playerListPlayers.forEach(player => {
        const playerPersonalBestElement = player.children[1];
        const playerPersonalBest = Number(playerPersonalBestElement.getAttribute("data-personal-best"));
        const hasPersonalBest = playerPersonalBest <= 0 ? false : true;

        const selectedPlayer = {
            name: player.children[0].textContent,
            style: player.children[2].textContent,
            personalBest: playerPersonalBest,
            isBot: player.classList.contains("bot")
        };

        new ContextMenu(player, [
            {
                label: "Spectate",
                action: () => spectate(selectedPlayer)
            }
        ]);

        playerPersonalBestElement.textContent = hasPersonalBest ? formatTime(playerPersonalBest) : "None";
    });

    yourPlayer.textContent = settings.playerName || "Player 1";
    
    setInterval(update, 200);

    function update() {
        pingElements.forEach(pingElement => pingElement.textContent = getRandomNumber(0, 1000));
    }
}
