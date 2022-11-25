const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

const handlers = {
    async openFile() {
        const { canceled, filePaths } = await dialog.showOpenDialog()
        if (canceled) {
            return
        } else {
            const filePath = filePaths[0]
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            return { filePath, fileContent }
        }
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
    // Add listeners for each preload event
    ipcMain.handle('dialog:openFile', handlers.openFile)
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})