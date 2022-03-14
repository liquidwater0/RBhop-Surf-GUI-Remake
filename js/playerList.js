export { playerList, yourStyle, yourPersonalBest };

import { settings } from "./menus/settingsMenu.js";
import { Timer, formatTime } from "./timer.js";
import ContextMenu from "./contextMenus.js";

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

        new ContextMenu(player, [
            {
                label: "Spectate",
                action: () => {
                    spectate(
                        player.classList.contains("bot"), //isBot
                        player.children[0].textContent, //name
                        player.children[2].textContent, //style
                        playerPersonalBest
                    );
                }
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

function spectate(isBot, name, style, personalBest) {
    const yourTimerElement = document.getElementById("timer");
    const spectateTimerElement = document.getElementById("spectateTimer");
    
    const spectateTimeElement = document.querySelector("#spectateTimer #time p:nth-child(2)");
    const spectatePersonalBestElement = document.querySelector("#spectateTimer p:nth-child(3)");
    const spectateProgressBarElement = document.querySelector("#spectateTimer #time #progressBar");
    const spectateStyleElement = document.querySelector("#spectateTimer #style p:first-of-type");
    const spectateNameElement = document.querySelector("#spectateTimer #name p:first-of-type");

    const botIcon = document.querySelector("#spectateTimer #name .bot");
    botIcon.style.visibility = isBot ? "visible" : "hidden";

    new Timer(spectateTimeElement, spectatePersonalBestElement, spectateProgressBarElement, personalBest);

    yourTimerElement.style.display = "none";
    spectateTimerElement.style.display = "block";

    spectateStyleElement.textContent = style;
    spectateNameElement.textContent = name;
}
