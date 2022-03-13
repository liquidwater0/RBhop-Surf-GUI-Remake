export { mainMenu, rockTheVote };

import { activateMenu } from "../menus.js";
import { timer } from "../timer.js";
import { sendNoticeMessage } from "../chat.js";
import { settings } from "./settingsMenu.js";

function mainMenu() {
    const restartButton = document.querySelector("[data-action='restart']");
    restartButton.addEventListener("click", () => timer.restart());

    let isOpen = false;

    document.addEventListener("keypress", event => {
        if (document.activeElement.tagName == "INPUT") return;

        if (event.key == "m" || event.key == "M") activateMenu("mainMenu", isOpen);
        isOpen = !isOpen;
    });

    const rtvButton = document.querySelector("[data-action='rockTheVote']");
    rtvButton.addEventListener("click", rockTheVote);
}

let hasRTVed = false;

function rockTheVote() {
    if (hasRTVed) {
        sendNoticeMessage("You already voted!");
        return;
    }

    sendNoticeMessage(`${settings.playerName || "Player 1"} wants to rock the vote. 10 more votes required to rock the vote.`);

    hasRTVed = true;
}
