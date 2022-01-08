import { menus } from "./menus.js";
import { mainMenu } from "./menus/mainMenu.js";
import { stylesMenu } from "./menus/stylesMenu.js";
import { settingsMenu } from "./menus/settingsMenu.js";

import { timer } from "./timer.js";
import { speed } from "./speed.js";
import { updatePlayerList } from "./playerList.js";
import { chat } from "./chat.js";

menus();
mainMenu();
stylesMenu();
settingsMenu();

timer();
speed();
updatePlayerList();
chat();
