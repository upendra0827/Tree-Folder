import React, { useState, useRef, useEffect } from 'react'
import { folderJson } from '../../utils'
import Folder from './Folder'
import { treeTraversals } from '../../utils'

const FolderTree = () => {
    const [openInputIn, setOpenInputIn] = useState('')
    const [tree, setTree] = useState({ ...folderJson });
    const inputRef = useRef(null)
    const [isFile, setIsFile] = useState(true)
    const [newFileName, setNewFileName] = useState('')
    const { addToTreeTraversal, deleteFromTreeTraversal, renameTraversal } = treeTraversals()

    const handleNewFileName = e => {
        setNewFileName(e.target.value)
    }

    const handleCreateNewFileOrFolder = ({ e, id }) => {
        e.preventDefault()
        if (!newFileName) return

        const newFileOrFolder = {
            name: newFileName,
            type: isFile ? 'file' : 'folder',
            ...(
                !isFile && { children: [] }
            )
        }

        const updatedTree = addToTreeTraversal({ newFileOrFolder, id, tree })
        setTree(updatedTree)
        setOpenInputIn('')
    }


    const handleDelete = ({ id }) => {
        const updatedTree = deleteFromTreeTraversal({ id, tree })
        setTree(updatedTree)
    }

    const handleRenameKeyDown = ({ e, element, id }) => {
        if (e.key === 'Enter') {
            element.setAttribute('contenteditable', false)
            element.style.backgroundColor = 'transparent'
            element.removeEventListener('keydown', handleRenameKeyDown)
            const updatedTree = renameTraversal({ id, val: element.innerText, tree })
            setTree(updatedTree)
        }
    }

    const handleRename = ({ e, identifier, id }) => {
        const element = document.getElementsByClassName(identifier)[0]
        element.setAttribute('contenteditable', true)
        element.focus()
        element.style.backgroundColor = '#A9A9A9'
        element.addEventListener('keydown', (e) => handleRenameKeyDown({ e, element, id }))
    }

    return (
        <div style={{ margin: '30px' }}>
            <Folder
                handleNewFileName={handleNewFileName}
                isFile={isFile}
                setIsFile={setIsFile}
                setTree={setTree}
                tree={tree}
                setOpenInputIn={setOpenInputIn}
                openInputIn={openInputIn}
                inputRef={inputRef}
                handleCreateNewFileOrFolder={handleCreateNewFileOrFolder}
                handleDelete={handleDelete}
                handleRename={handleRename}
            />
        </div>
    )
}

export default FolderTree
