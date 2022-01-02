import { activateMenu } from "../menus.js";

export function mainMenu() {
    let isOpen = false;

    document.addEventListener("keypress", function(event) {
        if (event.key == "m" || event.key == "M") activateMenu("mainMenu", isOpen);
        isOpen = !isOpen;
    });
}
