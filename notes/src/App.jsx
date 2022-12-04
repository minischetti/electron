
import React, { useState } from 'react';
// import { Context } from '../main';
export function App() {
    // use context
    // const { api } = React.useContext(Context);
    const openFile = async () => {
        // electron api call
        const results = await window.api.openFile();
        if (results.filePath) {
            setFilePath(results.filePath)
        }
        if (results.fileContent) {
          setFileContent(results.fileContent)
        }
    }
    const [filePath, setFilePath] = useState('')
    const [fileContent, setFileContent] = useState("");
    return (
        <div id="app">
            <button onClick={openFile}>Open File</button>
            <div>{filePath}</div>
            <div id="editor" contentEditable="true">
                {fileContent}
            </div>
        </div>
    )
}