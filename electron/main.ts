import {
  app,
  BrowserWindow,
  ipcMain,
  dialog
} from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow | null;

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
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

async function registerListeners () {
  ipcMain.on("dialog", (event, arg) => {
    if (mainWindow !== null) {
      dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [
          { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
          { name: 'Pdf', extensions: ['pdf'] },
          { name: "Doc", extensions: ['doc', 'docx'] }
        ]
      }).then(result => {
        console.log(result.canceled);
        const filePath = result.filePaths[0];

        console.log(filePath);
        event.reply("dialog", filePath);
      }).catch(err => {
        console.log(err);
      })
    };
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
