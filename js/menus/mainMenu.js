import { activateMenu } from "../menus.js";

export function mainMenu() {
    const mainMenuButton = document.getElementById("mainMenuButton");

    let isMainOpen = false;

    function updateState() { isMainOpen = !isMainOpen }

    document.addEventListener("keypress", function(event) {
        if (event.key == "m" || event.key == "M") activateMenu("mainMenu", isMainOpen);
        updateState();
    });

    mainMenuButton.addEventListener("click", function() {
        activateMenu("mainMenu", isMainOpen) ;
        updateState();
    });
}