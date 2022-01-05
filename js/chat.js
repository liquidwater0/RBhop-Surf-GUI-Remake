export { chatBox };

/*<li>
    <span class="time">[5:00pm]</span>
    <span class="bracket">[</span><span class="notice">Notice</span><span class="bracket">]</span>
    Player 1 placed #10/1000000 in the style Autohop with a time of 42:64.057
</li>*/

const chatBox = document.getElementById("chatBox");

chatBox.addEventListener("keydown", function(event) { if (event.key == "Enter") sendMessage() });

function sendMessage() {
    if (chatBox.value.trim() == "") return;

    const time = new Date().toLocaleString("en-us", 
        { 
            hour: "numeric", 
            minute: "2-digit", 
            hour12: true 
        });

    const messageList = document.querySelector("#chat ul");
    const playerName = "ong";

    messageList.insertAdjacentHTML("beforeend", `
        <li>
            <span class="time">[${time}]</span>
            <span class="player">${playerName}:</span> 
            ${chatBox.value}
        </li>
    `);

    chatBox.value = "";
}
