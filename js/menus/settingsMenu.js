export { settingsMenu, settings };
import { playerList } from "../playerList.js";
import { activateMenu } from "../menus.js";

let settings = localStorage.RBS_GUI_Remake ? JSON.parse(localStorage.RBS_GUI_Remake) : {};

function settingsMenu() {
    //Name and Color Changer
    const saveNameButton = document.getElementById("saveNameButton");
    const nameInput = document.getElementById("nameInput");
    const nameColor = document.getElementById("nameColor");

    nameInput.value = settings.playerName || "Player 1";
    nameColor.value = settings.nameColor || "#00a0ff";

    saveNameButton.addEventListener("click", saveName);    

    function saveName() {
        const playerSettings = {
            playerName: nameInput.value,
            nameColor: nameColor.value
        }

        settings = { ...settings, ...playerSettings };
        localStorage.RBS_GUI_Remake = JSON.stringify(settings);
        
        playerList();
        activateMenu("nameChange", false);
    }

    //Theme Changer
    const changeThemeButton = document.querySelector("[data-action='changeTheme']");
    changeThemeButton.addEventListener("click", changeTheme);

    let isDarkTheme;

    setTheme();

    function setTheme() {
        document.documentElement.setAttribute("data-theme", settings.theme || "dark");
    }

    function changeTheme() {
        isDarkTheme = !settings.theme || settings.theme == "dark" ? true : false;
        isDarkTheme = !isDarkTheme;

        const theme = { 
            theme: isDarkTheme ? "dark" : "light"
        }

        settings = { ...settings, ...theme };
        localStorage.RBS_GUI_Remake = JSON.stringify(settings);

        setTheme();
    }
}
