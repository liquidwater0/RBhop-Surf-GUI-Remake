export function menu() {
    const menuButton = document.getElementById("menuButton");
    const closeMenuButton = document.getElementById("closeMenuButton");
    const menu = document.getElementById("menu");

    menuButton.addEventListener("click", activateMenu);
    closeMenuButton.addEventListener("click", closeMenu);

    document.addEventListener("keydown", function(event) {
        if (event.key == "m" || event.key == "M") activateMenu();
    });

    let menuOpen = false;

    function activateMenu() {
        menuOpen = !menuOpen;
        menuOpen ? openMenu() : closeMenu();
    }

    function openMenu() {
        menu.style.transform = "translateY(0%)"
    }

    function closeMenu() {
        menuOpen = false;
        menu.style.transform = "translateY(100%)"
    }
}