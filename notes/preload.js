const electron = require('electron');
const { contextBridge, ipcRenderer } = electron;

contextBridge.exposeInMainWorld('api', {
    selectFile: () => ipcRenderer.invoke('dialog:selectFile'),
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
    getFileTree: () => ipcRenderer.invoke('explorer:getFileTree'),
})