const path = require("path");

const {
    app,
    BrowserWindow,
    ipcMain,
    Notification,
    dialog,
    Tray,
    Menu,
} = require("electron");
const { channels } = require("../src/shared/constants");
const isDev = require("electron-is-dev");

function createWindow() {
    // Create the browser window.
    const window = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        },
    });

    // and load the index.html of the app.
    // win.loadFile("index.html");
    window.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );
    // Open the DevTools.
    if (isDev) {
        window.webContents.openDevTools();
    }

    window.on('close', (event) => {
      if (!app.isExitForced) {
        event.preventDefault();
        window.hide();
      }
  
      return false;
    })

    const appTray = new Tray(path.join(__dirname, 'tray-icon.jpg'))
    const trayCtxMenu = new Menu.buildFromTemplate([
      { label: 'Open', click: () => window.show() },
      { label: 'Exit', click: () => {
        app.isExitForced = true;
        app.quit();
      }}
    ])
    appTray.setContextMenu(trayCtxMenu);

    ipcMain.on(channels.SHOW_DIALOG, (event, args) => {
        console.log(args);
        dialog.showMessageBox(window, args);
    });

    ipcMain.on(channels.SHOW_NOTIFICATION, (event, args) => {
        new Notification(args).show();
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
