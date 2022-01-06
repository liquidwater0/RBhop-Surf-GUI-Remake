import { updatePlayerList } from "../playerList.js";
import { activateMenu } from "../menus.js";

export function nameChangeMenu() {
    const saveNameButton = document.getElementById("saveNameButton");
    const nameInput = document.getElementById("nameInput");
    const nameColor = document.getElementById("nameColor");

    nameInput.value = localStorage.playerName || "Player 1";
    nameColor.value = localStorage.nameColor || "#00a0ff";

    saveNameButton.addEventListener("click", saveName);    

    function saveName() {
        localStorage.setItem("playerName", nameInput.value);
        localStorage.setItem("nameColor", nameColor.value);
        updatePlayerList();
        activateMenu("nameChange", false);
    }
}
