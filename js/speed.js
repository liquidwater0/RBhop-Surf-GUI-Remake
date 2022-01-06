import { paused } from "./timer.js";
import { chatBox } from "./chat.js";

export function speed() {
    const speedElement = document.querySelector("#speed > p:first-of-type");
    const speedBar = document.getElementById("speedBar");

    document.addEventListener("keydown", function(event) { 
        if (chatBox == document.activeElement) return;
        if (event.key == "w" || event.key == "W") increaseSpeed();
    });

    document.addEventListener("keyup", function(event) { //thanks drumman22 for idea of keyup
        if (chatBox == document.activeElement) return;
        if (event.key == "w" || event.key == "W") decreaseSpeed();
    });

    let speed = 0;

    function updateSpeed() {
        speedElement.textContent = `${speed.toFixed(2)} u/s`;
        speedBar.style.width = `${(speed / (speed + 72)) * 100}%`; //thanks Cool Doggo#3733
    }

    function increaseSpeed() {
        if (paused) return;
        speed++;
        
        updateSpeed(); 
    }

    function decreaseSpeed() {
        if (speed <= 0) return;
        speed--;

        updateSpeed();

        window.requestAnimationFrame(decreaseSpeed);
    }
}
