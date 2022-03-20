import ContextMenu from "./contextMenus.js";
import { menus, activateMenu } from "./menus.js";
import { speed } from "./speed.js";
import { playerList } from "./playerList.js";
import { chat } from "./chat.js";
import { showkeys } from "./showkeys.js";
import { timer } from "./timer.js";
import { spectateOverlay } from "./spectateOverlay.js";

menus();
speed();
playerList();
chat();
showkeys();
spectateOverlay();

new ContextMenu(document.documentElement, [
    {
        label: "Restart Run",
        action: () => timer.restart()
    }, {
        label: "Pause Run",
        action: () => timer.control()
    }, {
        label: "Complete Run",
        action: () => timer.completeRun()
    }, {
        label: "Open main menu",
        action: () => activateMenu("mainMenu", true)
    }
]);
