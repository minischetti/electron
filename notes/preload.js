const electron = require('electron');
const { contextBridge, ipcRenderer } = electron;

contextBridge.exposeInMainWorld('api', {
    
    selectFile: () => ipcRenderer.invoke('dialog:selectFile'),
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
    explorer: {
        tree: {
            get: (content) => ipcRenderer.invoke('explorer:tree::get', content),
            onUpdateListener: (callback) => ipcRenderer.on('explorer:tree::update', callback),
        }
    },
})