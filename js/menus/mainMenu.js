import { activateMenu } from "../menus.js";
import { restart } from "../timer.js";

export function mainMenu() {
    document.addEventListener("DOMContentLoaded", setTheme);

    const restartButton = document.querySelector("[data-action='restart']");
    const changeThemeButton = document.querySelector("[data-action='changeTheme']");

    restartButton.addEventListener("click", restart);
    changeThemeButton.addEventListener("click", changeTheme);

    let isOpen = false;

    document.addEventListener("keypress", function(event) {
        if (document.activeElement.tagName == "INPUT") return;

        if (event.key == "m" || event.key == "M") activateMenu("mainMenu", isOpen);
        isOpen = !isOpen;
    });

    let isDarkTheme = !localStorage.theme_RBS_GUI_Remake || localStorage.theme_RBS_GUI_Remake == "dark" ? true : false;

    function setTheme() {
        document.documentElement.setAttribute("data-theme", localStorage.theme_RBS_GUI_Remake || "dark");
    }

    function changeTheme() {
        isDarkTheme = !isDarkTheme;
        localStorage.theme_RBS_GUI_Remake = isDarkTheme ? "dark" : "light";
        setTheme();
    }
}
