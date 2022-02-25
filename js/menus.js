export { menus, activateMenu };

import { mainMenu } from "./menus/mainMenu.js"; 
import { stylesMenu } from "./menus/stylesMenu.js";
import { settingsMenu } from "./menus/settingsMenu.js"; 

mainMenu();
stylesMenu();
settingsMenu();

function menus() {
    const openMenuButtons = document.querySelectorAll("[data-menu-open]");
    const closeMenuButtons = document.querySelectorAll("[data-menu-close-button]");
    const menuButtons = document.querySelectorAll("[data-menu] ul li:not([data-menu-open])");

    let isOpen = false;

    openMenuButtons.forEach(openMenuButton => {
        openMenuButton.addEventListener("click", event => {
            const isSwitched = event.target.hasAttribute("data-switched");

            isOpen = !isOpen;

            activateMenu(event.target.getAttribute("data-menu-open"), isSwitched ? isOpen : true);
        });
    });

    closeMenuButtons.forEach(closeMenuButton => {
        closeMenuButton.addEventListener("click", event => { 
            activateMenu(event.target.parentElement.parentElement.parentElement.getAttribute("data-menu"), false);
        });
    });

    menuButtons.forEach(menuButton => {
        menuButton.addEventListener("click", event => { 
            activateMenu(event.target.parentElement.parentElement.parentElement.getAttribute("data-menu"), false);
        });
    });
}

function activateMenu(menu, openMenu) {
    const allMenus = document.querySelectorAll("[data-menu]");
    const currentMenu = document.querySelector(`[data-menu='${menu}']`);

    allMenus.forEach(menu => menu.classList.remove("menu-open"));

    if (openMenu) {
        currentMenu.classList.add("menu-open")
    } else {
        currentMenu.classList.remove("menu-open")
    }
}
