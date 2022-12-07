
import React, { useState, useEffect } from 'react';
import { CaretDown, CaretRight, Folder, File, FolderOpen } from "phosphor-react";

const Tree = {
    Item: ({ file, children = [] }) => {
        const [open, setOpen] = useState(false);
        return (
            <div className='tree-item--container'>
                <div className={`tree-item--header${children.length ? ' has-children' : ''}`} onClick={children.length ? () => setOpen(!open) : null}>
                    {file.isDirectory ?
                        open ? <FolderOpen /> : <Folder />
                        : <File />
                    }
                    {/* {file.isDirectory && children.length ? (open ?
                        <CaretDown className='tree-item--header-icon' />
                        : <CaretRight className='tree-item--header-icon' />
                    ) : ""} */}
                    <div className='tree-item-name'>{file.name}</div>
                    {file.isDirectory && children.length ?
                        <div>
                            <div className='tree-item--child-count'>{children.length}</div>
                        </div>
                        : null}
                </div>
                <div className={`tree-item--children${open ? " open" : ""}`}>
                    {children?.map((child, index) => {
                        return (
                            <Tree.Item key={index} file={child} children={child.children} />
                        )
                    })}
                </div>
            </div>
        )
    }
}


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
    const getExplorerDirectory = () => {
        return window.api.explorer.directory.get().then((results) => {
            console.log(results);
            setCurrentDirectory(results)
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
                <div className='section responsive section--tree'>
                    {/* <div className='header'>
                        <div className='toolbar'>
                            <button onClick={selectFile}>Open File</button>
                        </div>
                    </div> */}
                    {currentDirectory ? <div>{currentDirectory}</div> : null}
                    <div className='divider--h'></div>
                    <div className='tree'>
                        {explorerTree?.map((file, index) => {
                            if (file.isFile || (file.isDirectory && !file.children)) {
                                return (
                                    <Tree.Item key={index} file={file} index={index} />
                                )
                            } else if (file.isDirectory && file.children) {
                                return (
                                    <Tree.Item key={index} file={file} index={index} children={file.children} />
                                )
                            }
                        })}
                    </div>
                </div>
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