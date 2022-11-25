const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');


async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog()
    if (canceled) {
      return
    } else {
      return filePaths[0]
    }
  }

const createWindow = () => {
    const window = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
    })

    window.loadFile('index.html')
    window.webContents.openDevTools()
}

app.whenReady().then(() => {
    ipcMain.handle('dialog:openFile', handleFileOpen)
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})