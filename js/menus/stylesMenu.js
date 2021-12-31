import { activateMenu } from "../menus.js";

export function stylesMenu() {
    const styleButtons = document.querySelectorAll("[data-style]");
    const styleElement = document.querySelector("#style > p");

    styleButtons.forEach(function(styleButton) { styleButton.addEventListener("click", changeStyle) });

    function changeStyle(event) {
        styleElement.textContent = event.target.getAttribute("data-style");
        activateMenu(event.target.parentElement.parentElement.parentElement.getAttribute("data-menu"), false);
    }
}
