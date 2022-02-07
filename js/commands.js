import { restart } from "./timer.js";
import { sendNoticeMessage } from "./chat.js";
import { activateMenu } from "./menus.js";
import { settings, updateAutoRestart, autoRestart } from "./menus/settingsMenu.js";

export function commandHandler(message) {
    const prefixes = ["!", "/"];

    prefixes.forEach(function(prefix) {
        if (message[0] == prefix) {
            switch (message.slice(1)) {
                case "r":
                    restart();
                    break;
                case "styles":
                    activateMenu("styles", true);
                    break;
                case "settings":
                    activateMenu("settings", true);
                    break;
                case "name":
                    activateMenu("nameChange", true);
                    break;
                case "theme dark":
                    document.documentElement.setAttribute("data-theme", "dark");
                    settings.theme = "dark";
                    localStorage.RBS_GUI_Remake = JSON.stringify(settings);
                    break;
                case "theme light":
                    document.documentElement.setAttribute("data-theme", "light");
                    settings.theme = "light";
                    localStorage.RBS_GUI_Remake = JSON.stringify(settings);
                    break;
                case "controls":
                    activateMenu("controls", true);
                    break;
                case "autorestart":
                    updateAutoRestart();

                    settings.autoRestart = autoRestart;
                    localStorage.RBS_GUI_Remake = JSON.stringify(settings);
                    break;
                case "autorestart on":
                    settings.autoRestart = true;
                    localStorage.RBS_GUI_Remake = JSON.stringify(settings);
                    break;
                case "autorestart off":
                    settings.autoRestart = false;
                    localStorage.RBS_GUI_Remake = JSON.stringify(settings);
                    break;
                default:
                    sendNoticeMessage(`The command "${message}" does not exist.`);
                    break;
            }
        }
    });
}
