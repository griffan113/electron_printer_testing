import {
  app,
  BrowserWindow,
  ipcMain
} from 'electron';
import * as path from 'path';
import fs from 'fs';

let mainWindow: BrowserWindow | null;
let printWindow: BrowserWindow | null;

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
    height: 900,
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
    printWindow = null
  });
};

async function registerListeners () {

  /**
   * Print Silently
   */

  ipcMain.on("print", (event, arg) => {
    printWindow = new BrowserWindow({
      width: 302,
      height: 600,
      show: false,
    });

    printWindow.loadFile("C:/electron_printer_testing/public/printWindow.html");
    printWindow.on("ready-to-show", () => {
      if (printWindow !== null) printWindow.webContents.print({ copies: 1, silent: true });
    })
  });

  /**
   * Save picture to local path
   */

  ipcMain.on("savePic", (event, imageData: string) => {
    const tmpDir = 'tmp/';
    const path = tmpDir + Date.now() + '.png';
    const base64 = imageData.replace(/^data:image\/\w+;base64,/, ""); // Remove the front part of the image base64 code data:image/png;base64
    const dataBuffer = Buffer.from(base64, 'base64'); // Convert the base64 code into a buffer object,

    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

    fs.writeFile(path, dataBuffer, (err) => { // write file with fs
      if (err) {
        console.log(err);
      }
    });
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
