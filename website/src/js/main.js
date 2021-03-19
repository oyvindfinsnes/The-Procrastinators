function Interface() {
    this.txtUserInput = document.getElementById("userInput");
    this.btnUserSubmit = document.getElementById("userSubmit");
    this.divChatLog = document.getElementById("chatLog");
    this.botCanvas = document.getElementById("botCanvas");
    this.botLoader = document.getElementById("botLoader");
}

Interface.prototype.init = function () {
    // Keep a reference to this for nested functions
    var self = this;

    this.txtUserInput.addEventListener("keyup", function (e) {
        if (e.code === "Enter" && !e.shiftKey) {
            self.handleUserInput();
        }
    });

    this.btnUserSubmit.addEventListener("click", function () {
        self.handleUserInput();
    });

    this.botLoader.remove();
    this.botCanvas.classList.add("visible");
    this.btnUserSubmit.classList.remove("disabled");
    this.txtUserInput.disabled = false;
}

Interface.prototype.createLogEntry = function (name, text) {
    var node = document.createElement("span");

    node.setAttribute("class", name);
    // Capitalizing the first letter of the name
    node.setAttribute("data-name", name.charAt(0).toUpperCase() + name.slice(1));
    node.textContent = text;

    this.divChatLog.appendChild(node);
    // Scroll the chat log to bottom on new entry
    this.divChatLog.scrollTop = this.divChatLog.scrollHeight;
}

Interface.prototype.fetchBotResponse = function (input) {
    var xhttp = new XMLHttpRequest();
    var url = "src/pages/chatbot_interactor.php";
    var params = "input=" + String(input);

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    // Keep a reference to this for nested functions
    var self = this;
    // As a variable was created to preserve "class this", we can use
    // both self and this to refer to the correct objects
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            self.createLogEntry("bot", this.responseText);
            AnimationManager.override("acknowledge");
            AnimationManager.enqueue("idle");
        }
    };

    xhttp.send(params);
}

Interface.prototype.handleUserInput = function () {
    // Lock the text input/button until a response is given
    this.btnUserSubmit.classList.add("disabled");
    this.txtUserInput.disabled = true;

    if (this.txtUserInput.value.trim() !== "") {
        this.createLogEntry("user", this.txtUserInput.value);
        this.fetchBotResponse(this.txtUserInput.value);
    }

    this.btnUserSubmit.classList.remove("disabled");
    this.txtUserInput.disabled = false;
    this.txtUserInput.value = "";
    this.txtUserInput.focus();
}

var Interface = new Interface();

function main() {
    Interface.init();

    AnimationManager.enqueue("idle");
}

// Only start executing when the entire BABYLON.js scene is ready
scene.executeWhenReady(main);
