export { timer, restart, paused };
import { sendTimerMessage } from "./chat.js";
import { styleElement } from "../js/menus/stylesMenu.js";
import { yourPersonalBest } from "./playerList.js";

let paused = false;

document.addEventListener("keypress", function(event) {
    if (document.activeElement.tagName === "INPUT") return

    if (event.key == " ") paused = !paused;
    if (event.key == "r" || event.key == "R") restart();
    if (event.key == "Enter") completeRun();
});

const timeElement = document.querySelector("#time > p:first-of-type");
const personalBestElement = document.querySelector("#time > p:last-of-type");
const timerProgressBar = document.getElementById("progressBar");

let sinceStarted = 0;
let time = new Date();

let personalBest = null;

let timeConverted;
let personalBestConverted;

function convertFromMS(number) {
    return {
        minutes: String(parseInt((number / 1000) / 60)).padStart(2, "0"),
        seconds: String(parseInt((number / 1000) % 60)).padStart(2, "0"),
        milliseconds: String(parseInt(number % 1000)).padStart(3, "0")
    }
}

function timer() {
    updateTimer();

    function updateTimer() { //thanks Cool Doggo#3733
        sinceStarted = paused ? sinceStarted : sinceStarted += new Date() - time;
        time = new Date();
        
        timeConverted = convertFromMS(sinceStarted);
        personalBestConverted = convertFromMS(personalBest);
        
        timeElement.textContent = `Time: ${timeConverted.minutes}:${timeConverted.seconds}.${timeConverted.milliseconds}`;
        personalBestElement.textContent = 
            personalBest == null || personalBest == 0 ?
            `Record: None` :
            `Record: ${personalBestConverted.minutes}:${personalBestConverted.seconds}.${personalBestConverted.milliseconds}`;
        
        const timePercentage = `${(sinceStarted / personalBest).toFixed(2) * 100}%`;
        
        timerProgressBar.style.width = timePercentage;
        timerProgressBar.style.backgroundColor = (sinceStarted > personalBest) ? "red" : "rgb(0, 255, 0)";
        
        window.requestAnimationFrame(updateTimer);
    }
}

function restart() { 
    sinceStarted = 0;
    timerProgressBar.style.width = "0%";
}

function completeRun() {
    if (personalBest == null || sinceStarted < personalBest || personalBest == 0) {
        personalBest = sinceStarted;

        yourPersonalBest.textContent = `${timeConverted.minutes}:${timeConverted.seconds}.${timeConverted.milliseconds}`;

        sendTimerMessage(`
            ${localStorage.playerName_RBS_GUI_Remake || "Player 1"}
            placed #1/10 in the style ${styleElement.textContent} with a time of 
            ${timeConverted.minutes}:${timeConverted.seconds}.${timeConverted.milliseconds}
        `);
    }

    paused = true;
}
