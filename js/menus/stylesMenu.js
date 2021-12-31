import { activateMenu } from "../menus.js";

export function stylesMenu() {
    const styleButtons = document.querySelectorAll("[data-style]");
    const styleElement = document.getElementById("style");

    styleButtons.forEach(function(styleButton) { 
        styleButton.addEventListener("click", function(event) {
            changeStyle(styleButton.getAttribute("data-style"));
            activateMenu(event.target.parentElement.parentElement.parentElement, false);
        });
    });

    function changeStyle(style) {
        styleElement.textContent = style;
    }
}