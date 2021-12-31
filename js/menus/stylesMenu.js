import { activateMenu } from "../menus.js";

export function stylesMenu() {
    const styleButtons = document.querySelectorAll("[data-style]");
    const styleElement = document.querySelector("#style > p");

    styleButtons.forEach(function(styleButton) { 
        styleButton.addEventListener("click", function(event) {
            changeStyle(styleButton.getAttribute("data-style"));
            activateMenu(event.target.parentElement.parentElement.parentElement.getAttribute("data-menu"), false);
        });
    });

    function changeStyle(style) {
        styleElement.textContent = style;
    }
}
