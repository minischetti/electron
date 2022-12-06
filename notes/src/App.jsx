
import React, { useState, useEffect } from 'react';
import { CaretDown, CaretRight, Folder, File } from "phosphor-react";

const Tree = {
    Item: ({ file, children = [] }) => {
        const [open, setOpen] = useState(false);
        return (
            <div className='tree-item--container'>
                <div className={`tree-item--header${children.length ? ' has-children' : ''}`} onClick={children?() => setOpen(!open) : null}>
                    {file.isDirectory ? <Folder/> : <File/>}
                    {children.length ? (open ? 
                        <CaretDown className='tree-item--header-icon'/> 
                        : <CaretRight className='tree-item--header-icon'/>
                    ) : ""}
                    <div>{file.name}</div>
                </div>
                <div className={`tree-item--children${open? " open" : ""}`}>
                    {children?.map((child, index) => {
                        return (
                            <div key={index} className='tree-item--container'>
                                <div className='tree-item--header'>
                                    <div>{child.name}</div>
                                </div>
                            </div>
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
        <div className='container'>
            <div className='header'>
                <h1>Explorer</h1>
                <div className='toolbar'>
                    <button onClick={selectFile}>Open File</button>
                </div>
            </div>
            <div className='content'>
                <div className='tree'>
                    {explorerTree?.map((file, index) => {
                        if (file.isFile) {
                            return (
                                <Tree.Item key={index} file={file} index={index} />
                            )
                        } else if (file.isDirectory) {
                            return (
                                <Tree.Item key={index} file={file} index={index} children={file.children??[]} />
                            )
                        }
                    })}
                </div>
                <div id="editor">
                    <div>{filePath}</div>
                    <div>{fileContent}</div>
                </div>
            </div>
        </div>
    </div>
)
}