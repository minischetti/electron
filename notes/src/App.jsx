
import React, { useState, useEffect } from 'react';

export function App() {
    const selectFile = async () => {
        const results = await window.api.selectFile();
        if (results.filePath) {
            setFilePath(results.filePath)
        }
        if (results.fileContent) {
            setFileContent(results.fileContent)
        }
    }
    const getFileTree = () => {
        return window.api.getFileTree().then((results) => {
            console.log(results)
            setFileTree(results)
        })
    }
    useEffect(() => {
        getFileTree();

        window.api.updateExplorerTree(getFileTree);
    }, []);
    const [filePath, setFilePath] = useState("");
    const [fileContent, setFileContent] = useState("");
    const [fileTree, setFileTree] = useState([]);
    return (
        <div id="app">
            <div id="tree">
                <div>
                    {fileTree?.map((file, index) => {
                        if (file.isFile) {
                            return <div key={index} onClick={
                                () => {
                                    openFile(file.path)
                                }
                            }>{file.name} (file)</div>
                            
                        } else if (file.isDirectory) {
                            return <div key={index}>
                                <div>{file.name}</div>
                            </div>
                        }
                    })}
                </div>
            </div>
            <button onClick={selectFile}>Open File</button>
            <div>{filePath}</div>
            <div id="editor" contentEditable="true">
                {fileContent}
            </div>
        </div >
    )
}