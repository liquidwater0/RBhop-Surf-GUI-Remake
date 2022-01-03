import { paused } from "./timer.js";

export function speed() {
    const speedElement = document.querySelector("#speed > p:first-of-type");
    const speedBar = document.getElementById("speedBar");

    document.addEventListener("keydown", function(event) { if (event.key == "w" || event.key == "W") increaseSpeed() });
    document.addEventListener("keyup", function(event) { if (event.key == "w" || event.key == "W") decreaseSpeed() }); //thanks drumman22 for idea of keyup

    let speed = 0;

    function increaseSpeed() {
        if (paused) return;

        speed++;

        speedElement.textContent = `${speed.toFixed(2)} u/s`;
        speedBar.style.width = `${(speed / (speed + 72)) * 100}%`; //thanks Cool Doggo#3733
    }

    function decreaseSpeed() {
        speed = 0;

        speedElement.textContent = `${speed.toFixed(2)} u/s`;
        speedBar.style.width = "0%"
    }
}
