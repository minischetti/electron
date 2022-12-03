import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { join } from 'path';
import { readFileSync } from 'fs';
// create react context
import { createContext } from 'react';
export const Context = createContext({
    api: window.api
});

const handlers = {
    async openFile() {
        const { canceled, filePaths } = await dialog.showOpenDialog()
        if (canceled) {
            return
        } else {
            if (filePaths.length > 0) {
                const filePath = filePaths[0]
                const fileContent = readFileSync(filePath, 'utf-8');
                if (fileContent) {
                    return { filePath, fileContent }
                }
            }
        }
    },
    async openEditor(fileContent, container) {
        container.innerText = fileContent
    }
}   
const createWindow = () => {
    const window = new BrowserWindow({
        webPreferences: {
            preload: join(__dirname, 'preload.js')
        },
    })

    window.loadFile(
        join(__dirname, 'dist', 'index.html')
    )
    window.webContents.openDevTools()
}

app.whenReady().then(() => {
    // Add listeners for each preload event
    ipcMain.handle('dialog:openFile', handlers.openFile)
    ipcMain.handle('editor:open', handlers.openEditor)
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})