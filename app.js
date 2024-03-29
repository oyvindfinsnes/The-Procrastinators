const { app, Menu, BrowserWindow } = require("electron");
const path = require("path");

app.on("ready", () => {
	Menu.setApplicationMenu(null);

    const mainWindow = new BrowserWindow({
		width: 950,
		height: 760,
		minWidth: 950,
		minHeight: 780, // There is a slight diff of 20px from initial height
		backgroundColor: "#000000",
		title: "Marvin The Paranoid Android",
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
		icon: path.join(__dirname, "app", "img", "icon.png"),
    });

    mainWindow.loadURL(path.join("file://", __dirname, "app", "index.html"));
});

app.on("window-all-closed", () => {
	app.quit();
});
