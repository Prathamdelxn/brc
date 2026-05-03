const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;
let splashWindow;

const isDev = !app.isPackaged;

function createWindow() {
  // 1. Create Splash Screen
  splashWindow = new BrowserWindow({
    width: 400,
    height: 450,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    icon: path.join(__dirname, "../public/brandCore.png"),
    webPreferences: {
      nodeIntegration: true
    }
  });

  splashWindow.loadFile(path.join(__dirname, "splash.html"));

  // 2. Create Main Window (Hidden)
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false, // Don't show initially
    icon: path.join(__dirname, "../public/brandCore.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
  });

  mainWindow.removeMenu();

  // Load content
  if (isDev) {
    mainWindow.loadURL("brc-puce.vercel.app");
  } else {
    mainWindow.loadURL("brc-puce.vercel.app");
  }

  // 3. When Main Window is ready to show
  mainWindow.once("ready-to-show", () => {
    // Small delay to ensure splash is seen if app loads instantly
    setTimeout(() => {
      splashWindow.close();
      mainWindow.show();
      mainWindow.maximize(); // Optional: maximize on start
    }, 2000); 
  });
}

app.whenReady().then(createWindow);