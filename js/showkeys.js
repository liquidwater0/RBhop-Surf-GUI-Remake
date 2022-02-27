const keys = document.querySelectorAll(".showkeys [data-key]");
const mouseDirectionLeft = document.querySelector(".showkeys [data-direction='left']");
const mouseDirectionRight = document.querySelector(".showkeys [data-direction='right']");

export function showkeys() {
    document.addEventListener("keydown", event => {
        if (document.activeElement.tagName == "INPUT") return;
        
        keys.forEach(key => {
            const keyAttribute = key.getAttribute("data-key");

            if (event.key !== keyAttribute) return;
            if (event.key === keyAttribute) key.classList.add("pressed");
        });
    });

    document.addEventListener("keyup", event => {
        keys.forEach(key => {
            const keyAttribute = key.getAttribute("data-key");
            
            if (event.key === keyAttribute) key.classList.remove("pressed");
        });
    });

    document.addEventListener("mousemove", event => {
        if (document.activeElement.tagName == "INPUT") return;
        
        if (event.movementX < 0) {
            mouseDirectionLeft.classList.add("pressed");
            mouseDirectionRight.classList.remove("pressed");
        } else if (event.movementX > 0) {
            mouseDirectionLeft.classList.remove("pressed");
            mouseDirectionRight.classList.add("pressed");
        }
    });
}
