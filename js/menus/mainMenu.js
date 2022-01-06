import { activateMenu } from "../menus.js";
import { restart } from "../timer.js";

export function mainMenu() {
    const restartButton = document.querySelector("[data-action='restart']");
    restartButton.addEventListener("click", restart);

    let isOpen = false;

    document.addEventListener("keypress", function(event) {
        if (document.activeElement.tagName == "INPUT") return;

        if (event.key == "m" || event.key == "M") activateMenu("mainMenu", isOpen);
        isOpen = !isOpen;
    });
}
