import { contextBridge, ipcRenderer } from 'electron'

export const api = {
  requestOpenDialog: (dialogCallback: (data: string) => void) => {
    ipcRenderer.send('dialog');

    ipcRenderer
      .on("dialog", (_, filePath: string) => {
        dialogCallback(filePath);
      });
  },

  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  }
}

contextBridge.exposeInMainWorld('Main', api)
