export { spectate, stopSpectating, controlSpectate, isSpectating };

import Timer from "./timer.js";

const yourTimerElement = document.getElementById("timer");
const spectateTimerElement = document.getElementById("spectateTimer");

let isSpectating = false;

function spectate(player) {
    isSpectating = true;

    const spectateTimeElement = document.querySelector("#spectateTimer #time p:nth-child(2)");
    const spectatePersonalBestElement = document.querySelector("#spectateTimer p:nth-child(3)");
    const spectateProgressBarElement = document.querySelector("#spectateTimer #time #progressBar");
    const spectateStyleElement = document.querySelector("#spectateTimer #style p:first-of-type");
    const spectateNameElement = document.querySelector("#spectateTimer #name p:first-of-type");

    const botIcon = document.querySelector("#spectateTimer #name .bot");
    botIcon.style.visibility = player.isBot ? "visible" : "hidden";

    new Timer(spectateTimeElement, spectatePersonalBestElement, spectateProgressBarElement, player.personalBest);

    yourTimerElement.style.display = "none";
    spectateTimerElement.style.display = "block";

    spectateStyleElement.textContent = player.style;
    spectateNameElement.textContent = player.name;
}

function stopSpectating() {
    isSpectating = false;

    yourTimerElement.style.display = "block";
    spectateTimerElement.style.display = "none";
}

function controlSpectate() {
    isSpectating = !isSpectating;
}
