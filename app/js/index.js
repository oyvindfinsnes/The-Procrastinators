const { spawn } = require("child_process");
const path = require("path");
const opn = require("opn");

const platforms = { "win32": "Windows.exe", "darwin": "Darwin.app", "linux": "Linux" }
const env = process.platform;
// In practice, an infinitely looping executable (the chatbot) will be receiving
// and sending data, and needs to be initialized as soon as possible
const botEXE = path.join(__dirname, "chatbot", "bin", platforms[env]);
const botProcess = spawn(botEXE);

// Executed from Babylon startup when canvas is ready
function main() {
    // All DOM elements and animations are ready to be enabled
    Interface.enable();
    AnimationManager.enable();

    // Any time data is received from the bot (a response), pipe it to Interface
    botProcess.stdout.on("data", data => {
        Interface.writeBotResponse(data);
    });
}
