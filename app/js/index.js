const { spawn } = require("child_process");
const path = require("path");
// In practice, an infinitely looping executable (the chatbot) will be receiving
// and sending data, and needs to be initialized as soon as possible
const botEXE = path.join(__dirname, "chatbot", "dist", "Windows", "Windows.exe");
const botProcess = spawn(botEXE);

// Executed from Babylon startup when canvas is ready
function main() {
    // All DOM elements and aniamtions are ready to be enabled
    Interface.enable();
    AnimationManager.enable();

    // Any time data is received from the bot (a response), pipe it to Interface
    botProcess.stdout.on("data", data => {
        Interface.writeBotResponse(data);
    });
}
