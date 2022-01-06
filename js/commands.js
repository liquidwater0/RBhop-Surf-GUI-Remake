import { restart } from "./timer.js";
import { sendNoticeMessage } from "./chat.js";
import { activateMenu } from "./menus.js";

export function commandHandler(message) {
    const prefixes = ["!", "/"];

    prefixes.forEach(function(prefix) {
        if (message[0] == prefix) {
            switch (message.slice(1)) {
                case "r":
                    restart();
                    break;
                case "style":
                    activateMenu("styles", true);
                    break;
                default:
                    sendNoticeMessage(`The command "${message}" does not exist.`);
                    break;
            }
        }
    });
}
