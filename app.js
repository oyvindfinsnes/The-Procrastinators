const { app, Menu, BrowserWindow } = require("electron");
const path = require("path");

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
		width: 1000,
		height: 800,
		minWidth: 1000,
		minHeight: 800,
		backgroundColor: "#000000",
		title: "Marvin The Paranoid Android",
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
		icon: path.join("file://" + __dirname, "app", "img", "favicon.ico"),
    });

    Menu.setApplicationMenu(null);
    mainWindow.loadURL(path.join("file://", __dirname, "app", "index.html"));

    mainWindow.webContents.openDevTools();
});

app.on("window-all-closed", () => {
	app.quit();
});
