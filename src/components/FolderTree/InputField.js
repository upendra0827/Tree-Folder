import React, { useEffect, useRef, useState } from 'react'
import FolderIcon from '../../icons/FolderIcon.svg'
import FileIcon from '../../icons/FileIcon.svg'

const InputField = ({ type, handleCreateNewFileOrFolder, handleNewFileName, inputRef, id }) => {

    useEffect(() => {
        inputRef?.current?.focus()
    }, [inputRef?.current])

    return (
        <form
            style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '20px',
                gap: '4px'
            }}
            onSubmit={(e) => handleCreateNewFileOrFolder({ e, id })}>

            {type === 'file' ? <img src={FileIcon} width='30px' height='30px' /> : <img src={FolderIcon} width='30px' height='30px' />}

            <input
                ref={inputRef}
                placeholder={`Enter ${type} name`}
                onChange={handleNewFileName}
            />
        </form>
    )
}

export default InputField
