const playerListElement = document.querySelector("#playerList ul");
const yourPlayer = playerListElement.children[1];

export function updatePlayerList() {
    yourPlayer.textContent = localStorage.playerName || "Player 1";
}
