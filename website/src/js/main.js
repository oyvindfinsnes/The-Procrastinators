function createLogEntry(name, text) {
    var node = document.createElement("span");
    var logElem = document.getElementById("chatLog");

    node.setAttribute("class", name);
    node.setAttribute("data-name", name.charAt(0).toUpperCase() + name.slice(1));
    node.textContent = text;

    logElem.appendChild(node);
    logElem.scrollTop = logElem.scrollHeight;
}

function fetchBotResponse(input) {
    var xhttp = new XMLHttpRequest();
    var url = "src/pages/response-api.php";
    var params = "input=" + String(input);

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            createLogEntry("bot", this.responseText);
        }
    };

    xhttp.send(params);
}

function handleUserInput() {
    var elem = document.getElementById("userInput");

    if (elem.value.trim() !== "") {
        createLogEntry("user", elem.value);
        fetchBotResponse(elem.value);
    }

    elem.value = "";
    elem.focus();
}

function main() {
    document.getElementById("userInput").addEventListener("keyup", function (e) {
        if (e.code === "Enter" && !e.shiftKey) handleUserInput();
    });
    document.getElementById("userSubmit").addEventListener("click", handleUserInput);
    
    AnimationManager.enqueue("thoughtful-head-shake");
}

// Only start executing when the entire BABYLON.js scene is ready
scene.executeWhenReady(main);