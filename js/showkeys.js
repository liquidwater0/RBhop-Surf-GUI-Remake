const keys = document.querySelectorAll(".showkeys [data-key]");

export function showkeys() {
    window.addEventListener("keydown", event => {
        if (document.activeElement.tagName == "INPUT") return;
        
        keys.forEach(key => {
            const keyAttribute = key.getAttribute("data-key");

            if (event.key !== keyAttribute) return;
            if (event.key === keyAttribute) key.classList.add("pressed");
        });
    });

    window.addEventListener("keyup", event => {
        keys.forEach(key => {
            const keyAttribute = key.getAttribute("data-key");
            
            if (event.key === keyAttribute) key.classList.remove("pressed");
        });
    });
}