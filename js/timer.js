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

let personalBest = {
    minutes: null,
    seconds: null,
    milliseconds: null
}

let personalBestMS = null;

let sinceStarted = 0;
let time = new Date();

function convertToMS(personalBest) { //function is not necessary but i want it for easy changing of the PB without needing to use a millisecond calculator
    const minutesMS = Number(personalBest.minutes * 1000 * 60);
    const secondsMS = Number(personalBest.seconds * 1000);
    const milliseconds = Number(personalBest.milliseconds);

    return minutesMS + secondsMS + milliseconds;
}

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
        
        const converted = convertFromMS(sinceStarted);
        
        timeElement.textContent = `Time: ${converted.minutes}:${converted.seconds}.${converted.milliseconds}`;
        personalBestElement.textContent = 
            personalBest.minutes == null || personalBest.seconds == null || personalBest.milliseconds == null ?
            `Record: None` :
            `Record: ${personalBest.minutes}:${personalBest.seconds}.${personalBest.milliseconds}`;
        
        const timePercentage = `${(sinceStarted / personalBestMS).toFixed(2) * 100}%`;
        
        timerProgressBar.style.width = timePercentage;
        timerProgressBar.style.backgroundColor = (sinceStarted > personalBestMS) ? "red" : "rgb(0, 255, 0)";
        
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
    function setPersonalBest() {
        const converted = convertFromMS(sinceStarted);

        personalBest = {
            minutes: converted.minutes,
            seconds: converted.seconds,
            milliseconds: converted.milliseconds
        }

        personalBestMS = convertToMS(personalBest);
    }

    if (personalBest.minutes == null || personalBest.seconds == null || personalBest.milliseconds == null || sinceStarted < personalBestMS) setPersonalBest();

    pause();
}
