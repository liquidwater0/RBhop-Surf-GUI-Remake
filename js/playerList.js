const playerListElement = document.querySelector("#playerList ul");
const yourPlayer = playerListElement.children[1];

export function updatePlayerList() {
    yourPlayer.textContent = localStorage.playerName_RBS_GUI_Remake || "Player 1";
}
