export function speed() {
    const speedElement = document.querySelector("#speed > p:first-of-type");
    const speedBar = document.getElementById("speedBar");

    document.addEventListener("keydown", function(event) { if (event.key == "w" || event.key == "W") increaseSpeed() });

    let speed = 0;
    let speedBarWidth = 0;

    function increaseSpeed() {
        speed++;
        speedBarWidth++;

        speedElement.textContent = `${speed.toFixed(2)} u/s`;
        speedBar.style.width = `${speedBarWidth}%`;
    }
}