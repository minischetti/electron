
import React, { useState, useEffect, useRef } from 'react';
import { FolderNotch, Check, X, Hash } from "phosphor-react";
import Panes from './src/templates/views/Panes';
import { Tree } from './src/templates/components/Tree';

export function Index() {
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
    const getExplorerDirectory = () => {
        return window.api.explorer.directory.get().then((results) => {
            console.log(results);
            setCurrentDirectory(results)
        });
    }

    const handleCreateNewDirectory = (path) => {
        return window.api.explorer.directory.new(path).then((results) => {
            console.log(results);
        });
    }
    useEffect(() => {
        getExplorerTree();
        getExplorerDirectory();

        window.api.explorer.tree.onUpdateListener(getExplorerTree);
    }, []);
    const [filePath, setFilePath] = useState("");
    const [fileContent, setFileContent] = useState("");
    const [explorerTree, setExplorerTree] = useState([]);
    const [currentDirectory, setCurrentDirectory] = useState("");
    return (
        <div id="app" className='container'>
            <div className='content'>
                <div className='section responsive--v responsive--h'>
                    {currentDirectory ? <div>{currentDirectory}</div> : null}
                    <div className='divider--h'></div>
                    <div className='tree'>
                        {explorerTree?.map((file, index) => {
                            if (file.isFile || (file.isDirectory && !file.children)) {
                                return (
                                    <Tree.Item key={index} file={file} index={index} />
                                )
                            } else if (file.isDirectory) {
                                return (
                                    <div>
                                        <Tree.Item key={index} file={file} index={index} content={file.children} handleCreateNewDirectory={handleCreateNewDirectory} />
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
                <Panes>

                </Panes>
                <div className='section'>
                    <div id="editor">
                        <div>{filePath}</div>
                        <div>{fileContent}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}