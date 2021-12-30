export function timer() {
    const timeElement = document.querySelector("#time > :first-child");
    const personalBestElement = document.querySelector("#time > :last-child");

    const personalBest = {
        minutes: "00",
        seconds: "10",
        milliseconds: "465"
    }

    const runStarted = new Date();
    const personalBestDate = new Date(
        runStarted.getFullYear(),
        runStarted.getMonth(), 
        runStarted.getDate(),
        runStarted.getHours(),
        runStarted.getMinutes() + Number(personalBest.minutes),
        runStarted.getSeconds() + Number(personalBest.seconds),
        runStarted.getMilliseconds() + Number(personalBest.milliseconds)
    );

    updateTimer();
    
    function updateTimer() {
        const now = new Date();
        const sinceStarted = new Date(now.getTime() - runStarted.getTime());
       
        timeElement.textContent = `Time: ${sinceStarted.getMinutes()}:${sinceStarted.getSeconds()}.${sinceStarted.getMilliseconds()}`;
        personalBestElement.textContent = `Record: ${personalBest.minutes}:${personalBest.seconds}.${personalBest.milliseconds}`;

        if (now.toLocaleString() == personalBestDate.toLocaleString()) return;

        window.requestAnimationFrame(updateTimer);
    }
}