export { timer, restart, paused }

document.addEventListener("keypress", function(event) { 
    if (event.key == " ") switchPauseState();
    if (event.key == "r" || event.key == "R") restart();
    if (event.key == "Enter") completeRun();
});

const timeElement = document.querySelector("#time > p:first-of-type");
const personalBestElement = document.querySelector("#time > p:last-of-type");
const timerProgressBar = document.getElementById("progressBar");

let paused = false;

let sinceStarted = 0;
let time = new Date();

let personalBest = null;

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
        
        const timeConverted = convertFromMS(sinceStarted);
        const personalBestConverted = convertFromMS(personalBest);
        
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

function pause() {
    paused = true;
}

function switchPauseState() {
    paused = !paused;
}

function restart() {
    sinceStarted = 0;
    timerProgressBar.style.width = "0%";
}

function completeRun() {
    if (personalBest == null || sinceStarted < personalBest || personalBest == 0) personalBest = sinceStarted;

    pause();
}
