import { updatePlayerList } from "../playerList.js";
import { activateMenu } from "../menus.js";

export function settingsMenu() {
    //Name and Color Changer
    const saveNameButton = document.getElementById("saveNameButton");
    const nameInput = document.getElementById("nameInput");
    const nameColor = document.getElementById("nameColor");

    nameInput.value = localStorage.playerName_RBS_GUI_Remake || "Player 1";
    nameColor.value = localStorage.nameColor_RBS_GUI_Remake || "#00a0ff";

    saveNameButton.addEventListener("click", saveName);    

    function saveName() {
        localStorage.setItem("playerName_RBS_GUI_Remake", nameInput.value);
        localStorage.setItem("nameColor_RBS_GUI_Remake", nameColor.value);
        updatePlayerList();
        activateMenu("nameChange", false);
    }

    //Theme Changer
    const changeThemeButton = document.querySelector("[data-action='changeTheme']");
    changeThemeButton.addEventListener("click", changeTheme);

    let isDarkTheme;

    setTheme();

    function setTheme() {
        document.documentElement.setAttribute("data-theme", localStorage.theme_RBS_GUI_Remake || "dark");
    }

    function changeTheme() {
        isDarkTheme = !localStorage.theme_RBS_GUI_Remake || localStorage.theme_RBS_GUI_Remake == "dark" ? true : false;
        isDarkTheme = !isDarkTheme;
        localStorage.theme_RBS_GUI_Remake = isDarkTheme ? "dark" : "light";
        setTheme();
    }
}