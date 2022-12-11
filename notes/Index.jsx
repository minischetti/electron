
import React, { useState, useEffect, useRef } from 'react';
import { CaretDown, CaretRight, FolderNotch, File, FilePlus, FolderNotchOpen, FolderNotchPlus, FolderNotch, Check, X, Hash } from "phosphor-react";
import Tabs from './src/templates/components/Tabs';

const Tree = {
    Item: ({ children, file, content = [], handleCreateNewDirectory }) => {
        const [open, setOpen] = useState(false);

        const NewDirectoryForm = ({ parent_path }) => {
            const handleClick = (event) => {
                event.stopPropagation();
            }

            const handleCloseButtonClick = (event) => {
                event.preventDefault();
                event.stopPropagation();
                setShouldShowNewDirectoryForm(false);
                setOpen(false);
            }

            const handleKeyEvents = (event) => {
                // if key is escape, close the form
                if (event.keyCode === 27) {
                    setOpen(false);
                    setShouldShowNewDirectoryForm(false);
                }
                // if key is enter, submit the form
                if (event.keyCode === 13) {
                    const new_path = parent_path + "/" + event.target.value;
                    handleCreateNewDirectory(new_path);
                }
            }

            const handleSubmit = (event) => {
                event.preventDefault();
                event.stopPropagation();
                const new_path = parent_path + "/" + event.target[0].value;
                handleCreateNewDirectory(new_path);
                setShouldShowNewDirectoryForm(false);
            }

            return (
                <div>
                    <form className='input-container' onSubmit={handleSubmit}>
                        <input type="text" placeholder='Folder name' onClick={handleClick} onKeyUp={handleKeyEvents} />
                        <button type="button" className='btn btn--negative' onClick={handleCloseButtonClick}>
                            <div className='btn-stack'>
                                <span className='btn-shortcut'>Esc</span>
                                <span className='btn-action'>Cancel</span>
                            </div>
                            {/* <X /> */}
                        </button>
                        <button type="submit" className='btn btn--positive'>
                            <div className='btn-stack'>
                                <span className='btn-shortcut'>Enter</span>
                                <span className='btn-action'>Create</span>
                            </div>
                            {/* <Check /> */}
                        </button>
                    </form>
                </div>
            )
        }


        const tabs = [
            {
                label: "New Folder",
                icon: <FolderNotchPlus size={18} className='btn--icon-icon' />,
                content: (
                    <NewDirectoryForm parent_path={file.path} />
                )
            },
            {
                label: "New File",
                icon: <FilePlus size={18} className='btn--icon-icon' />,
                content: (
                    <div>Coming soon!</div>
                )
            }
        ]

        return (
            <div className={`tree-item-container${open ? ' tree-item-container--open' : ""}`}>
                <div tabIndex={0} className={`tree-item-header${content.length ? ' has-children' : ''}`} onClick={content.length ? () => setOpen(!open) : null}>
                    {file.isDirectory ?
                        open ? <FolderNotchOpen size={20} /> : <FolderNotch size={20} />
                        : <File size={20} />
                    }
                    <div className='tree-item-name'>{file.name}</div>
                    {/* <div className='toolbar toolbar--inline'>
                        <div className="btn--icon" onClick={(event) => showNewDirectoryForm(event)}>
                            <FolderNotchPlus />
                        </div>
                    </div> */}
                    {file.isDirectory && content.length ?
                        <div className='number'>{content.length}</div>
                        : null}
                    {file.isDirectory && content.length ? (open ?
                        <CaretDown className='tree-item-header-icon' size={20} />
                        : <CaretRight className='tree-item-header-icon' size={20} />
                    ) : ""}
                </div>
                {open ?
                    <div>
                        <div className="toolbar toolbar--shelf">
                            <div>Stats</div>
                            <div className='counter--icon'>
                                <div>{file.stats?.files ?? "?"}</div>
                                <File size={18} />
                                <div>Files</div>
                            </div>
                            <div className='counter--icon'>
                                <div>{file.stats?.directories ?? "?"}</div>
                                <FolderNotch size={18} className='btn--icon-icon' />
                                <div>Folders</div>
                            </div>
                        </div>
                        <div className='toolbar toolbar--shelf'>
                            <div>Actions</div>
                            <Tabs.List tabs={tabs} />
                        </div>
                    </div> : null}
                <div className={`tree-item-children${open ? " open" : ""}`}>
                    {/* <div>Items</div> */}
                    {content?.map((child, index) => {
                        return (
                            <Tree.Item key={index} file={child} content={child.children} />
                        )
                    })}
                </div>
            </div>
        )
    }
}


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
                <div className='section responsive section--tree'>
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
                                    <div>
                                        <Tree.Item key={index} file={file} index={index} content={file.children} handleCreateNewDirectory={handleCreateNewDirectory} />
                                    </div>
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