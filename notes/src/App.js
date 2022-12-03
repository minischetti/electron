
import React, { useState } from 'react';
import { Context } from '../main';
export function App() {
    // use context
    const { api } = React.useContext(Context);
    const openFile = async () => {
        const results = await api.openFile()
        if (results.filePath) {
          filePathElement.innerText = results.filePath
        }
        if (results.fileContent) {
          editor.innerText = results.fileContent
        }
    }
    const [filePath, setFilePath] = useState('')
    const [fileContent, setFileContent] = useState("");
    return (
        <div id="app">
            <button onClick={openFile}>Open File</button>
            <div>{filePath}</div>
        </div>
    )
}