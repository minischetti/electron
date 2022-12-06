import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path, { join, resolve } from 'node:path';
import fs from 'fs';
import watcher from '@parcel/watcher';
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
    getExplorerTree() {
        const root = resolve(__dirname, 'sandbox');
        const files = fs.readdirSync(root);
        const updateFile = (file) => {
            let new_file = {};
            const stats = fs.statSync(file);
            new_file = {
                name: file,
                path: join(path.dirname(file), path.basename(file)),
                isFile: stats.isFile(),
                isDirectory: stats.isDirectory(),
            }
            if (stats.isDirectory()) {
                new_file.children = fs.readdirSync(file)
                    .map((child) => {
                        const child_path = join(file, child);
                        return updateFile(child_path);
                    })
            }
            return new_file;
        }
        return files
            // .map((file, index) => {
            //     return files[index] = join(root, file);
            // })
            .map((file) => {
                // send file path to updateFile
                const file_path = join(root, file);
                const new_file = updateFile(file_path);
                // if (new_file.isDirectory) {
                //     new_file.children = fs.readdirSync(new_file.name)
                //         .map((child) => {
                //             return updateFile(child);
                //         })
                // }
                return new_file;
            })
    },
    // update explorer tree with path from argument
    updateExplorerTree(path) {
        // send new files to renderer
        const files = fs.readdirSync(path);
        return files.map(file => {
            const path = join(path, file);
            const stats = fs.statSync(path);
            return {
                name: file,
                path: path,
                isFile: stats.isFile(),
                isDirectory: stats.isDirectory(),
            }
        });
    },
    // updateExplorerTree(event, directory) {
    //     const window = BrowserWindow.fromWebContents(event.sender);
    //     window.webContents.send('explorer:tree::update', directory);
    // },
}
const createWindow = async () => {
    const window = new BrowserWindow({
        webPreferences: {
            preload: join(__dirname, 'preload.js')
        },
    })

    const root = resolve(__dirname, 'sandbox');

    await watcher.subscribe(root, (err, events) => {
        const new_files = fs.readdirSync(root)
        // send new files to renderer
        // window.webContents.send('explorer:tree::update', new_files);
        console.log(new_files);
        if (err) {
            console.log(err);
        } else {
            console.log(events);
        }
    });

    window.loadFile(
        join(__dirname, 'dist', 'index.html')
    )


    window.webContents.openDevTools()
}

app.whenReady().then(() => {
    // Add listeners for each preload event
    ipcMain.handle('dialog:openFile', handlers.openFile)
    ipcMain.handle('dialog:selectFile', handlers.selectFile)
    ipcMain.handle('explorer:tree::get', handlers.getExplorerTree)
    ipcMain.handle('explorer:tree::update', handlers.updateExplorerTree)
    // watcher.subscribe({
    //     root: join(__dirname, 'sandbox'),
    //     onEvent: (event) => {
    //         console.log(event);
    //     }
    // });
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})