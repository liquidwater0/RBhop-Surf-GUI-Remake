export { timer, timerPaused };

import { sendTimerMessage } from "./chat.js";
import { styleElement } from "../js/menus/stylesMenu.js";
import { yourPersonalBest } from "./playerList.js";
import { settings } from "./menus/settingsMenu.js";

let timerPaused = false;

class Timer {
    constructor(currentTimeElement, personalBestElement, progressBar) {
        this.currentTimeElement = currentTimeElement;
        this.personalBestElement = personalBestElement;
        this.progressBar = progressBar;

        this.sinceStarted = 0;
        this.time = new Date();
        this.personalBest = null;

        this.timeConverted;
        this.personalBestConverted;

        this.run();
    }

    convertFromMS(number) {
        return {
            minutes: String(parseInt((number / 1000) / 60)).padStart(2, "0"),
            seconds: String(parseInt((number / 1000) % 60)).padStart(2, "0"),
            milliseconds: String(parseInt(number % 1000)).padStart(3, "0")
        }
    }

    formatTime(minutes, seconds, milliseconds) {
        return `${minutes}:${seconds}.${milliseconds}`;
    }

    run() {
        this.sinceStarted = timerPaused ? this.sinceStarted : this.sinceStarted += new Date() - this.time;
        this.time = new Date();

        if (this.personalBest && this.sinceStarted > this.personalBest && settings.autoRestart == true) this.restart();

        this.timeConverted = this.convertFromMS(this.sinceStarted);
        this.personalBestConverted = this.convertFromMS(this.personalBest);

        const currentTime = this.formatTime(this.timeConverted.minutes, this.timeConverted.seconds, this.timeConverted.milliseconds);
        const personalBestTime = this.formatTime(this.personalBestConverted.minutes, this.personalBestConverted.seconds, this.personalBestConverted.milliseconds);
        
        this.currentTimeElement.textContent = `Time: ${currentTime}`;
        this.personalBestElement.textContent = 
            !this.personalBest ?
            `Record: None` :
            `Record: ${personalBestTime}`;
        
        const timePercentage = `${(this.sinceStarted / this.personalBest).toFixed(2) * 100}%`;
        
        this.progressBar.style.width = timePercentage;
        this.progressBar.style.backgroundColor = (this.sinceStarted > this.personalBest) ? "red" : "rgb(0, 255, 0)";

        window.requestAnimationFrame(() => this.run());
    }

    completeRun() {
        if (!this.personalBest || this.sinceStarted < this.personalBest) {
            const currentTime = this.formatTime(this.timeConverted.minutes, this.timeConverted.seconds, this.timeConverted.milliseconds);

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
    
        timerPaused = true;
    }

    control() {
        timerPaused = !timerPaused;
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

    if (event.shiftKey && event.key === " ") timer.control(); // idk why it won't work with Space + Shift????
    if (event.key.toLowerCase() === "r") timer.restart();
    if (event.key === "Enter") timer.completeRun();
});
