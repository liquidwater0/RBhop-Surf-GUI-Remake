export { playerList, getPlayerInfo, yourStyleTextElement, yourPersonalBestTextElement, playerListPlayers };

import ContextMenu from "./contextMenus.js";
import { settings } from "./menus/settingsMenu.js";
import { formatTime } from "./timer.js";
import { spectate } from "./spectate.js";
import { activateMenu } from "./menus.js";

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const yourPlayer = document.querySelector("#playerList [data-player]");

const yourPlayerTextElement = document.querySelector("#playerList [data-your-player]");
const yourStyleTextElement = document.querySelector("#playerList [data-your-style]");
const yourPersonalBestTextElement = document.querySelector("#playerList [data-your-personal-best]");

const playerListElement = document.getElementById("playerList");
const playerListPlayers = document.querySelectorAll("#playerList .player:not([data-player])");
const pingElements = document.querySelectorAll("[data-ping]");

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

function getPlayerInfo(player) {
    const playerPersonalBestElement = player.children[1];
    const playerPersonalBest = Number(playerPersonalBestElement.getAttribute("data-personal-best"));

    return {
        name: player.children[0].textContent,
        style: player.children[2].textContent,
        personalBest: playerPersonalBest,
        isBot: player.classList.contains("bot")
    }
}

function playerList() {
    new ContextMenu(yourPlayer, [
        {
            label: "Change Name",
            action: () => activateMenu("nameChange", true)
        }
    ]);

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

    yourPlayerTextElement.textContent = settings.playerName || "Player 1";
    
    setInterval(update, 200);

    function update() {
        pingElements.forEach(pingElement => pingElement.textContent = getRandomNumber(0, 1000));
    }
}
