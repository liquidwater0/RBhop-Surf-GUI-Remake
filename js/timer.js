export { timer, playPause, restart }

document.addEventListener("keypress", function(event) { 
    if (event.key == " ") playPause();
    if (event.key == "r" || event.key == "R") restart();
});

const timeElement = document.querySelector("#time > p:first-of-type");
const personalBestElement = document.querySelector("#time > p:last-of-type");
const timerProgressBar = document.getElementById("progressBar");

const personalBest = {
    minutes: "00",
    seconds: "06",
    milliseconds: "302"
}

let paused = false;

let sinceStarted = 0;
const personalBestMS = convertToMS(personalBest);

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
    setInterval(updateTimer, 1);

    function updateTimer() {
        sinceStarted = paused ? sinceStarted : (sinceStarted + 1 * 4.1);
        
        const converted = convertFromMS(sinceStarted);
        
        timeElement.textContent = `Time: ${converted.minutes}:${converted.seconds}.${converted.milliseconds}`;
        personalBestElement.textContent = `Record: ${personalBest.minutes}:${personalBest.seconds}.${personalBest.milliseconds}`;
        
        const timePercentage = `${(sinceStarted / personalBestMS).toFixed(2) * 100}%`;
        
        timerProgressBar.style.width = timePercentage;
        timerProgressBar.style.backgroundColor = (sinceStarted > personalBestMS) ? "red" : "rgb(0, 255, 0)";
    }
}

function playPause() {
    paused = !paused;
}

function restart() {
    sinceStarted = 0;
    timerProgressBar.style.width = "0%";
}
