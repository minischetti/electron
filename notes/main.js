import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { join } from 'node:path';
import fs from 'fs';
// create react context
import { createContext } from 'react';
import { fstat } from 'node:fs';
export const Context = createContext({
});

const handlers = {
    async selectFile() {
        const { canceled, filePaths } = await dialog.showOpenDialog()
        if (canceled) {
            return
        } else {
            if (filePaths.length > 0) {
                const filePath = filePaths[0]
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                if (fileContent) {
                    return { filePath, fileContent }
                }
            }
        }
    },
    openFile(path) {
        const fileContent = fs.readFileSync(path, 'utf-8');
        if (fileContent) {
            return { path, fileContent }
        } else {
            console.log('Error: fileContent is undefined');
        }
    },
    getFileTree() {
        const root = join(__dirname, 'sandbox');
        const files = fs.readdirSync(root);
        const new_files = files.map(file => {
            const path = join(root, file);
            const stats = fs.statSync(path);
            return {
                name: file,
                path,
                isFile: stats.isFile(),
                isDirectory: stats.isDirectory(),
                stats: stats
            }
        });
        return new_files;
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
        ipcMain.handle('dialog:selectFile', handlers.selectFile)
        ipcMain.handle('explorer:getFileTree', handlers.getFileTree)
        createWindow()

        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) createWindow()
        })
    })

app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })