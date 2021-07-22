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

  ipcMain.on("savePic", (event, imageData: string) => {
    console.log("a");

    function base64ToArrayBuffer (base64: string) {
      const binaryString = window.atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes.buffer;
    }

    const image = base64ToArrayBuffer(imageData)

    fs.writeFile("winner.png", new Uint8Array(image), (err) => {
      if (err) return console.log(err);
      console.log("Loaded");
    })
  })
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
