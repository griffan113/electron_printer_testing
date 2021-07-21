import {
  app,
  BrowserWindow,
  ipcMain
} from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow | null;
let secondWindow: BrowserWindow | null;
let cameraWindow: BrowserWindow | null;

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const assetsPath =
  process.env.NODE_ENV === 'production'
    ? process.resourcesPath
    : app.getAppPath();

function createWindow () {
  mainWindow = new BrowserWindow({
    icon: path.join(assetsPath, 'assets', 'icon.png'),
    minHeight: 600,
    minWidth: 500,
    width: 1100,
    height: 700,
    backgroundColor: '#FFF',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.on('closed', () => {
    mainWindow = null;
    secondWindow = null
  });
};

async function registerListeners () {

  /**
   * Print Silently
   */
  ipcMain.on("print", (event, arg) => {
    secondWindow = new BrowserWindow({
      width: 302,
      height: 600,
      show: false,
    });

    secondWindow.loadFile("C:/electron_printer_testing/public/secondWindow.html");
    secondWindow.on("ready-to-show", () => {
      if (secondWindow !== null) secondWindow.webContents.print({ copies: 1, silent: true });
    })
  })

  /**
   * Open Camera window
   */
  ipcMain.on("openCameraWindow", () => {
    cameraWindow = new BrowserWindow({
      fullscreen: true,
    });

    cameraWindow.loadFile("C:/electron_printer_testing/public/cameraWindow.html");

    cameraWindow.setMenu(null);
  });
};

app.on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch(e => console.error(e));

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  };
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  };
});
