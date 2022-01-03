export function speed() {
    const speedElement = document.querySelector("#speed > p:first-of-type");
    const speedBar = document.getElementById("speedBar");

    document.addEventListener("keydown", function(event) { if (event.key == "w" || event.key == "W") increaseSpeed() });

    let speed = 0;

    function increaseSpeed() {
        speed++;

        speedElement.textContent = `${speed.toFixed(2)} u/s`;
        speedBar.style.width = `${(speed / (speed + 72)) * 100}%`; //thanks Cool Doggo#3733
    }
}
