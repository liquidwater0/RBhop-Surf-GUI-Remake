export { stylesMenu, styleElement }
import { restart } from "../timer.js";
import { yourStyle } from "../playerList.js";

const styleButtons = document.querySelectorAll("[data-style]");
const styleElement = document.querySelector("#style > p");

function stylesMenu() {
    styleButtons.forEach(function(styleButton) { styleButton.addEventListener("click", changeStyle) });

    function changeStyle(event) {
        styleElement.textContent = event.target.getAttribute("data-style");
        yourStyle.textContent = event.target.getAttribute("data-style");
        restart();
    }
}
