import { paused } from "./timer.js";

export function speed() {
    const speedElement = document.querySelector("#speed > p:first-of-type");
    const speedBar = document.getElementById("speedBar");

    document.addEventListener("keydown", function(event) { 
        if (document.activeElement.tagName == "INPUT") return;
        if (event.key == "w" || event.key == "W") increaseSpeed();
    });

    document.addEventListener("keyup", function(event) { //thanks drumman22 for idea of keyup
        if (document.activeElement.tagName == "INPUT") return;
        if (event.key == "w" || event.key == "W") decreaseSpeed();
    });

    let speed = 0;

    function updateSpeed() {
        speedElement.textContent = `${speed.toFixed(2)} u/s`;
        speedBar.style.width = `${(speed / (speed + 72)) * 100}%`; //thanks Cool Doggo#3733
    }

    //make it so speed stops decreasing when you press W while speed is decreasing
    function increaseSpeed() {
        if (!paused) speed++;
        updateSpeed(); 
    }

    //make it so requestAnimationFrame isn't called multiple times when spamming W
    function decreaseSpeed() {
        if (speed <= 0) return;
        if (!paused) speed--;
        updateSpeed();

        window.requestAnimationFrame(decreaseSpeed);
    }
}
