import { timer } from "./timer.js";
import { activateMenu } from "./menus.js";
import { settings, saveSettings, updateAutoRestart, autoRestart } from "./menus/settingsMenu.js";
import { rockTheVote } from "./menus/mainMenu.js";
import { playerListPlayers } from "./playerList.js";
import { spectate, stopSpectating, controlSpectate, isSpectating } from "./spectate.js";

export const commands = [
    {
        name: "Restart",
        description: "Restart the run.",
        aliases: ["r", "restart"],
        arguments: null,
        activateCommand: () => timer.restart()
    }, {
        name: "Styles",
        description: "Open the styles menu.",
        aliases: ["style", "styles"],
        arguments: null,
        activateCommand: () => activateMenu("styles", true)
    }, {
        name: "Settings",
        description: "Open the settings menu.",
        aliases: ["settings"],
        arguments: null,
        activateCommand: () => activateMenu("settings", true)
    }, {
        name: "Name Change",
        description: "Open the name change menu.",
        aliases: ["name"],
        arguments: null,
        activateCommand: () => activateMenu("nameChange", true)
    }, {
        name: "Theme",
        description: "Change the theme.",
        aliases: ["theme"],
        arguments: ["dark", "light"],
        activateCommand: argument => {
            document.documentElement.setAttribute("data-theme", argument);
            settings.theme = argument;
            
            saveSettings();
        }
    }, {
        name: "Controls",
        description: "Open the controls menu.",
        aliases: ["controls"],
        arguments: null,
        activateCommand: () => activateMenu("controls", true)
    }, {
        name: "Auto Restart",
        description: "Open the styles menu.",
        aliases: ["autorestart", "ar"],
        optionalArgs: true,
        arguments: ["on", "off"],
        activateCommand: argument => {
            if (argument === "on") {
                settings.autoRestart = true;
            } else if (argument === "off") {
                settings.autoRestart = false;
            } else {
                updateAutoRestart();
                settings.autoRestart = autoRestart;
            }

            saveSettings();
        }
    }, {
        name: "Main Menu",
        description: "Open the main menu.",
        aliases: ["menu"],
        arguments: null,
        activateCommand: () => activateMenu("mainMenu", true)
    }, {
        name: "Showkeys",
        description: "Open showkeys.",
        aliases: ["showkeys"],
        arguments: null,
        activateCommand: () => {
            const showkeys = document.querySelector(".showkeys");
            showkeys.classList.toggle("active");
        }
    }, {
        name: "Rock the vote",
        description: "Rock the vote.",
        aliases: ["rtv"],
        arguments: null,
        activateCommand: () => rockTheVote()
    }, {
        name: "Spectate",
        description: "Start spectating.",
        aliases: ["spec", "spectate"],
        arguments: null,
        activateCommand: () => {
            const playerPersonalBestElement = playerListPlayers[0].children[1];
            const playerPersonalBest = Number(playerPersonalBestElement.getAttribute("data-personal-best"));

            const firstPlayer = {
                name: playerListPlayers[0].children[0].textContent,
                style: playerListPlayers[0].children[2].textContent,
                personalBest: playerPersonalBest,
                isBot: playerListPlayers[0].classList.contains("bot")
            };

            controlSpectate();
            
            if (isSpectating) {
                spectate(firstPlayer);
            } else {
                stopSpectating();
            }
        }
    }
]
