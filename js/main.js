import { menus } from "./menus.js";
import { mainMenu } from "./menus/mainMenu.js";
import { stylesMenu } from "./menus/stylesMenu.js";
import { nameChangeMenu } from "./menus/nameChangeMenu.js";

import { timer } from "./timer.js";
import { speed } from "./speed.js";
import { updatePlayerList } from "./playerList.js";
import { chat } from "./chat.js";

menus();
mainMenu();
stylesMenu();
nameChangeMenu();

timer();
speed();
updatePlayerList();
chat();
