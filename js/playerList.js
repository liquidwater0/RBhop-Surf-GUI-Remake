import { playerName } from "./chat.js";

export function playerList() {
    const playerList = document.querySelector("#playerList ul");
    const yourPlayer = playerList.children[1];

    yourPlayer.textContent = playerName;
}