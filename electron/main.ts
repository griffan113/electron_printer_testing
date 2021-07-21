import {
  app,
  BrowserWindow,
  ipcMain
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
      nodeIntegration: true,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

async function registerListeners () {
  ipcMain.on("dialog", (event, arg) => {
    // if (mainWindow !== null) {
    //   dialog.showOpenDialog(mainWindow, {
    //     properties: ['openFile'],
    //     filters: [
    //       { name: 'Pdf', extensions: ['pdf'] },
    //     ]
    //   }).then(async result => {
    //     console.log(result.canceled);
    //     const filePath = result.filePaths[0];

    //     if (mainWindow !== null) {
    //       mainWindow?.hide();
    //       // load PDF.
    //       mainWindow.loadFile(`${filePath}`).then(() => console.log("Loaded file...")).catch(() => console.log);

    //       // if pdf is loaded start printing.
    //       mainWindow.webContents.on('did-finish-load', () => {
    //         // mainWindow.webContents.print({ silent: true });
    //         if (mainWindow !== null) mainWindow.webContents.print({ silent: false });
    //         // close window after print order.
    //         mainWindow = null;
    //       });
    //       mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    //     }

    //     // if (mainWindow !== null) console.log(mainWindow.webContents.getPrinters());


    //     console.log(filePath);
    //     event.reply("dialog", filePath);
    //   }).catch(err => {
    //     console.log(err);
    //   })
    // };

    // Carregar Html em uma nova página,
    // Imprimir essa nova página,

    const secondPage = new BrowserWindow({
      width: 302,
      height: 600,
      show: false,
    });

    secondPage.loadFile("C:/electron_printer_testing/public/secondPage.html");
    secondPage.on("ready-to-show", () => {
      secondPage.webContents.print({ copies: 1, silent: true });
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
