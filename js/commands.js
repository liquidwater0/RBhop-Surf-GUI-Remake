import { restart } from "./timer.js";
import { sendNoticeMessage } from "./chat.js";
import { activateMenu } from "./menus.js";
import { settings, updateAutoRestart, autoRestart } from "./menus/settingsMenu.js";

const commands = [
    {
        name: "Restart",
        description: "Restart the run.",
        aliases: ["r", "restart"],
        arguments: null,
        activateCommand: () => restart()
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
            if (argument === "dark") {
                document.documentElement.setAttribute("data-theme", "dark");
                settings.theme = "dark";
            } else if (argument === "light") {
                document.documentElement.setAttribute("data-theme", "light");
                settings.theme = "light";
            }
            
            localStorage.RBS_GUI_Remake = JSON.stringify(settings);
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
        arguments: ["on", "off"], //Make switched eventually
        activateCommand: argument => {
            if (argument === "on") {
                settings.autoRestart = true;
            } else if (argument === "off") {
                settings.autoRestart = false;
            }

            localStorage.RBS_GUI_Remake = JSON.stringify(settings);
        }
    }
]

export function commandHandler(message) {
    const prefixes = ["!", "/"];

    function checkPrefix(prefix) {
        return message[0] == prefix;
    }

    if (!prefixes.some(checkPrefix)) return;

    const messageParts = message.slice(1).split(" ");

    function checkCommand() {
        let commandObject = {};

        commands.forEach(command => {
            command.aliases.forEach(alias => {
                if (messageParts[0] === alias) commandObject.command = command;
            });

            if (command.arguments === null) return;

            command.arguments.forEach(argument => {
                if (messageParts[1] === argument) commandObject.correctArguments = true;
            });
        });

        return commandObject;
    }

    const correctCommand = checkCommand().command;

    if (!correctCommand) {
        sendNoticeMessage(`The command "${message}" does not exist.`);
        return;
    }

    //fix invalid arguments message for optional arguments
    if (correctCommand.arguments !== null && !checkCommand().correctArguments) {
        sendNoticeMessage(`Invalid arguments.`);
        return;
    }

    correctCommand.activateCommand(messageParts[1]);
}
