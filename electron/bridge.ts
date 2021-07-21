import { contextBridge, ipcRenderer } from 'electron'

export const api = {
  printSilently: (/* dialogCallback: (data: string) => void */) => {
    ipcRenderer.send('print');

    /*     ipcRenderer
          .on("dialog", (_, filePath: string) => {
            dialogCallback(filePath);
          }); */
  },

  openCameraWindow: () => {
    ipcRenderer.send("openCameraWindow");
  },

  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  }
}

contextBridge.exposeInMainWorld('Main', api)
