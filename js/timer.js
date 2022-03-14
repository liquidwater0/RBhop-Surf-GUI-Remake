export { Timer, timer, timerPaused, formatTime };

import { sendTimerMessage } from "./chat.js";
import { styleElement } from "../js/menus/stylesMenu.js";
import { yourPersonalBest } from "./playerList.js";
import { settings } from "./menus/settingsMenu.js";

let timerPaused = false;

function formatTime(ms) {
    const minutes = String(parseInt((ms / 1000) / 60)).padStart(2, "0");
    const seconds = String(parseInt((ms / 1000) % 60)).padStart(2, "0");
    const milliseconds = String(parseInt(ms % 1000)).padStart(3, "0");

    return `${minutes}:${seconds}.${milliseconds}`;
}

class Timer {
    constructor(currentTimeElement, personalBestElement, progressBar, personalBest) {
        this.currentTimeElement = currentTimeElement;
        this.personalBestElement = personalBestElement;
        this.progressBar = progressBar;

        this.paused = false;

        this.sinceStarted = 0;
        this.time = new Date();
        this.personalBest = personalBest;

        this.timeConverted;
        this.personalBestConverted;
        
        this.run();
    }

    run() {
        this.sinceStarted = this.paused ? this.sinceStarted : this.sinceStarted += new Date() - this.time;
        this.time = new Date();

        if (this.personalBest && this.sinceStarted > this.personalBest && settings.autoRestart == true) this.restart();

        const currentTime = formatTime(this.sinceStarted);
        const personalBestTime = formatTime(this.personalBest);
        
        this.currentTimeElement.textContent = `Time: ${currentTime}`;
        this.personalBestElement.textContent = 
            !this.personalBest ?
            `Record: None` :
            `Record: ${personalBestTime}`;
        
        const timePercentage = this.personalBest ? `${(this.sinceStarted / this.personalBest).toFixed(2) * 100}%` : "0%";
        
        this.progressBar.style.width = timePercentage;
        this.progressBar.style.backgroundColor = (this.sinceStarted > this.personalBest) ? "red" : "rgb(0, 255, 0)";

        window.requestAnimationFrame(() => this.run());
    }

    completeRun() {
        if (!this.personalBest || this.sinceStarted < this.personalBest) {
            const currentTime = formatTime(this.sinceStarted);

            this.personalBest = this.sinceStarted;
    
            yourPersonalBest.textContent = !this.personalBest ? "None" : currentTime;
    
            if (this.personalBest) {
                sendTimerMessage(`
                    ${settings.playerName || "Player 1"}
                    placed #1/10 in the style ${styleElement.textContent} with a time of 
                    ${currentTime}
                `);
            }
        }
    
        this.paused = true;
    }

    control() {
        this.paused = !this.paused;
    }

    restart() {
        this.sinceStarted = 0;
        this.progressBar.style.width = "0%";
    }
}

const timeElement = document.querySelector("#time > p:first-of-type");
const personalBestElement = document.querySelector("#time > p:last-of-type");
const timerProgressBar = document.getElementById("progressBar");

const timer = new Timer(timeElement, personalBestElement, timerProgressBar);

document.addEventListener("keydown", event => {
    if (document.activeElement.tagName === "INPUT") return;

    if (event.shiftKey && event.key === " ") {
        timer.control(); // idk why it won't work with Space + Shift????
        timerPaused = !timerPaused;
    }

    if (event.key.toLowerCase() === "r") timer.restart();
    if (event.key === "Enter") timer.completeRun();
});
