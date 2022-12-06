
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
    const getExplorerTree = () => {
        return window.api.explorer.tree.get().then((results) => {
            console.log(results);
            setExplorerTree(results)
        });
    }
    const updateExplorerTree = (file) => {
        // console.log(path);
        window.api.explorer.tree.update(file.name).then((results) => {
            // console.log(results);
            setExplorerTree(results)
        });
    }
    useEffect(() => {
        getExplorerTree();
    }, []);
    const [filePath, setFilePath] = useState("");
    const [fileContent, setFileContent] = useState("");
    const [explorerTree, setExplorerTree] = useState([]);
    return (
        <div id="app">
            <div id="tree">
                <div>
                    {explorerTree?.map((file, index) => {
                        if (file.isFile) {
                            return <div key={index}>
                                <div>{file.name}</div>
                            </div>

                        } else if (file.isDirectory) {
                            return (
                                <div key={index}>
                                    <div>{file.name}</div>
                                    <div className='children'>
                                        {file.children?.map((child, index) => {
                                            return (
                                                <div key={index}>
                                                    <div>{child.name}</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
            <button onClick={selectFile}>Open File</button>
            <div>{filePath}</div>
            <div id="editor">
                {fileContent}
            </div>
        </div >
    )
}