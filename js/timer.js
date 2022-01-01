export function timer() {
    const timeElement = document.querySelector("#time > :first-child");
    const personalBestElement = document.querySelector("#time > :last-child");

    const personalBest = {
        minutes: "00",
        seconds: "7",
        milliseconds: "338"
    }

    function convertToMS(personalBest) { //function is not necessary but i want it for easy changing of the PB without needing to use a millisecond calculator
        const minutesMS = Number(personalBest.minutes * 1000 * 60);
        const secondsMS = Number(personalBest.seconds * 1000);
        const milliseconds = Number(personalBest.milliseconds);

        return minutesMS + secondsMS + milliseconds;
    }

    function convertFromMS(number) {
        return {
            minutes: (number / 1000) / 60,
            seconds: (number / 1000) % 60,
            milliseconds: number % 1000
        }
    }

    const runStarted = new Date();
    const personalBestMS = convertToMS(personalBest);

    updateTimer();

    function updateTimer() {
        const now = new Date();
        const sinceStarted = now.getTime() - runStarted.getTime();

        const currentMinutes = String(parseInt(convertFromMS(sinceStarted).minutes)).padStart(2, "0");
        const currentSeconds = String(parseInt(convertFromMS(sinceStarted).seconds)).padStart(2, "0");
        const currentMilliseconds = String(parseInt(convertFromMS(sinceStarted).milliseconds)).padStart(3, "0");

        timeElement.textContent = `Time: ${currentMinutes}:${currentSeconds}.${currentMilliseconds}`;
        personalBestElement.textContent = `Record: ${personalBest.minutes}:${personalBest.seconds}.${personalBest.milliseconds}`;

        if (timeElement == personalBestMS) return; //fix somehow

        window.requestAnimationFrame(updateTimer);
    }
}
