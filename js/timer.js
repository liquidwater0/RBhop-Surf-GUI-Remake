export function timer() {
    const timeElement = document.querySelector("#time > :first-child");
    const personalBestElement = document.querySelector("#time > :last-child");

    const personalBest = {
        minutes: "00",
        seconds: "7",
        milliseconds: "106"
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
    
    async function updateTimer() {
        const now = new Date();
        const sinceStarted = new Date(now.getTime() - runStarted.getTime());

        // const timerBarPercentage = now / (runStarted.getTime() * now.getTime());
        // console.log(timerBarPercentage);
        // console.log(`
        //     Started: ${personalBestDate.getTime() / sinceStarted.getTime()}
        //     Now Time: ${now.getTime()}
        //     PB Time: ${personalBestDate.getTime()}
        // `);

        timeElement.textContent = `Time: ${sinceStarted.getMinutes()}:${sinceStarted.getSeconds()}.${sinceStarted.getMilliseconds()}`;
        personalBestElement.textContent = `Record: ${personalBest.minutes}:${personalBest.seconds}.${personalBest.milliseconds}`;

        if (Date.parse(now) == Date.parse(personalBestDate)) return;

        window.requestAnimationFrame(updateTimer);
    }
}
