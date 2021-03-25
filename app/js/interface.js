class Interface {
    static init() {
        this.txtUserInput = document.getElementById("userInput");
        this.btnUserSubmit = document.getElementById("userSubmit");
        this.divChatLog = document.getElementById("chatLog");
        this.botCanvas = document.getElementById("botCanvas");
        this.botLoader = document.getElementById("botLoader");
        this.btnStartScreen = document.getElementById("btnStart");
        this.startScreen = document.getElementById("particlesBG");
        this.particleScript = document.getElementById("particleScript");
        const self = this;

        this.txtUserInput.addEventListener("keyup", e => {
            if (e.code === "Enter" && !e.shiftKey) {
                self.handleUserInput();
            }
        });
    
        this.btnUserSubmit.addEventListener("click", () => {
            self.handleUserInput();
        });

        this.btnStartScreen.addEventListener("click", () => {
            self.handleStart();
        });
    }

    static enable() {
        this.botLoader.remove();
        this.botCanvas.classList.add("visible");
        this.btnUserSubmit.classList.remove("disabled");
        this.txtUserInput.disabled = false;
    }

    static createLogEntry(name, text) {
        const node = document.createElement("span");
    
        node.setAttribute("class", name);

        // Capitalizing the first letter of the name
        node.setAttribute("data-name", name.charAt(0).toUpperCase() + name.slice(1));
        node.textContent = text;
    
        this.divChatLog.appendChild(node);

        // Scroll the chat log to bottom on new entry
        this.divChatLog.scrollTop = this.divChatLog.scrollHeight;
    }

    static writeBotResponse(input) {
        this.createLogEntry("bot", input);
        AnimationManager.playRandomTalkingAnimation();
    }

    static handleUserInput() {
        // Lock the text input/button until a response is given
        this.btnUserSubmit.classList.add("disabled");
        this.txtUserInput.disabled = true;
    
        if (this.txtUserInput.value.trim() !== "") {
            this.createLogEntry("user", this.txtUserInput.value);
            botProcess.stdin.write(this.txtUserInput.value + "\n");
        }
    
        this.btnUserSubmit.classList.remove("disabled");
        this.txtUserInput.disabled = false;
        this.txtUserInput.value = "";
        this.txtUserInput.focus();
    }

    static handleStart() {
        this.startScreen.classList.add("vanish");

        setTimeout(() => {
            this.particleScript.remove();
            this.startScreen.remove();
            Babylon.startup();
        }, 1200);
    }
}

Interface.init();
