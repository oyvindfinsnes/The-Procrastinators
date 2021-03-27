class Interface {
    static init() {
        this.typingIndicator = document.querySelector(".typing-indicator");
        this.txtUserInput = document.querySelector("#userInput");
        this.btnUserSubmit = document.querySelector("#userSubmit");
        this.divChatLog = document.querySelector("#chatLog");
        this.botCanvas = document.querySelector("#botCanvas");
        this.botLoader = document.querySelector("#botLoader");
        this.btnStartScreen = document.querySelector("#btnStart");
        this.startScreen = document.querySelector("#particlesBG");
        this.particleScript = document.querySelector("#particleScript");
        this.links = document.querySelectorAll("a");
        this.menuTabs = document.querySelectorAll(".menu-tab");
        this.containerTabs = document.querySelectorAll(".interface-container");
        this.responseStart = Date.now();

        this.txtUserInput.addEventListener("keyup", e => {
            if (e.code === "Enter" && !e.shiftKey) {
                this._handleUserInput();
            }
        });
    
        this.btnUserSubmit.addEventListener("click", () => {
            this._handleUserInput();
        });

        this.btnStartScreen.addEventListener("click", () => {
            this._handleStart();
        });

        this.menuTabs.forEach(tab => {
            tab.addEventListener("click", e => {
                this._handleMenuNavigation(e);
            });
        });

        this.links.forEach(link => {
            link.addEventListener("click", e => {
                this._handleClickedLink(e);
            });
        });
    }

    static enable() {
        this.botLoader.remove();
        this.botCanvas.classList.add("visible");
        this.btnUserSubmit.classList.remove("disabled");
        this.txtUserInput.disabled = false;
    }

    static writeBotResponse(input) {
        const responseTime = Date.now() - this.responseStart;
        const baseResponseTime = 1000;
        const extraTime = 10 * input.length;
        let msDelay = 0;

        // Add "typing" delay if the response isn't already longer than the delay
        if (responseTime < baseResponseTime + extraTime) {
            msDelay = (baseResponseTime + extraTime) - responseTime;
        }
        
        setTimeout(() => {
            this._createLogEntry("bot", input);
            AnimationManager.playRandomTalkingAnimation();
            SpeechManager.speak(input);

            // Unlock the text input/button
            this.typingIndicator.classList.remove("active");
            this.btnUserSubmit.classList.remove("disabled");
            this.txtUserInput.disabled = false;
            this.txtUserInput.focus();
        }, msDelay);
    }

    static _createLogEntry(name, text) {
        const node = document.createElement("span");
    
        node.setAttribute("class", name);
        // Capitalizing the first letter of the name
        node.setAttribute("data-name", name.charAt(0).toUpperCase() + name.slice(1));
        node.textContent = text;
    
        this.divChatLog.appendChild(node);
        // Scroll the chat log to bottom on new entry
        this.divChatLog.scrollTop = this.divChatLog.scrollHeight;
    }

    static _handleUserInput() {
        // Get rid of unwanted newlines and carriage returns that leads to the
        // Python input() function running multiple times at once
        const input = this.txtUserInput.value.replace(/\r?\n|\r/g, " ").trim();
        this.txtUserInput.value = "";

        // Input that contains at least one alphanumeric character shouldn't
        // crash the chatbot (since single characters like [#, %, \, ...] do)
        if (input !== "" && /[A-Z]/i.test(input)) {
            this.responseStart = Date.now();
            // Lock the text input/button until a response is given later
            this.typingIndicator.classList.add("active");
            this.btnUserSubmit.classList.add("disabled");
            this.txtUserInput.disabled = true;

            this._createLogEntry("user", input);
            botProcess.stdin.write(input + "\n");
        }
    }

    static _handleMenuNavigation(e) {
        const tabname = e.currentTarget.dataset.tab;

        this.menuTabs.forEach(tab => {
            tab.classList.remove("active");
            if (tab.dataset.tab === tabname) tab.classList.add("active");
        });

        this.containerTabs.forEach(container => {
            container.classList.remove("active");
            if (container.dataset.tab === tabname) container.classList.add("active");
        });
    }

    static _handleStart() {
        this.startScreen.classList.add("vanish");
        
        this.startScreen.addEventListener("animationend", () => {
            Babylon.startup();
            this.particleScript.remove();
            this.startScreen.remove();
        });
    }

    static _handleClickedLink(e) {
        const opn = require("opn");
        opn(e.currentTarget.dataset.link);
    }
}

Interface.init();
