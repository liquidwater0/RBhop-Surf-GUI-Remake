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

    run() {
        this.sinceStarted = timerPaused ? this.sinceStarted : this.sinceStarted += new Date() - this.time;
        this.time = new Date();

        this.timeConverted = this.convertFromMS(this.sinceStarted);
        this.personalBestConverted = this.convertFromMS(this.personalBest);

        if (this.sinceStarted > this.personalBest && this.personalBest != null && this.personalBest != 0 && settings.autoRestart == true) this.restart();
        
        this.currentTimeElement.textContent = `Time: ${this.timeConverted.minutes}:${this.timeConverted.seconds}.${this.timeConverted.milliseconds}`;
        this.personalBestElement.textContent = 
            (this.personalBest == null || this.personalBest == 0) ?
            `Record: None` :
            `Record: ${this.personalBestConverted.minutes}:${this.personalBestConverted.seconds}.${this.personalBestConverted.milliseconds}`;
        
        const timePercentage = `${(this.sinceStarted / this.personalBest).toFixed(2) * 100}%`;
        
        this.progressBar.style.width = timePercentage;
        this.progressBar.style.backgroundColor = (this.sinceStarted > this.personalBest) ? "red" : "rgb(0, 255, 0)";

        window.requestAnimationFrame(() => this.run());
    }

    completeRun() {
        if (this.personalBest == null || this.sinceStarted < this.personalBest || this.personalBest == 0) {
            this.personalBest = this.sinceStarted;
    
            yourPersonalBest.textContent = this.personalBest == 0 ? "None" : `${this.timeConverted.minutes}:${this.timeConverted.seconds}.${this.timeConverted.milliseconds}`;
    
            if (this.personalBest != 0) {
                sendTimerMessage(`
                    ${settings.playerName || "Player 1"}
                    placed #1/10 in the style ${styleElement.textContent} with a time of 
                    ${this.timeConverted.minutes}:${this.timeConverted.seconds}.${this.timeConverted.milliseconds}
                `)
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
