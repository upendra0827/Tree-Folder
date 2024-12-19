import React, { useState } from 'react'
import FolderIcon from '../../icons/FolderIcon.svg'
import FileIcon from '../../icons/FileIcon.svg'
import InputField from './InputField'
import FileWithPlusSign from '../../icons/FileWithPlusSign.svg'
import FolderWithPlusSign from '../../icons/FolderWIthPlusSign.svg'
import BinIcon from '../../icons/BinIcon.svg'
import EditIcon from '../../icons/EditIcon.svg'

const Folder = ({ tree,
    openInputIn,
    setOpenInputIn,
    inputRef,
    handleCreateNewFileOrFolder,
    isFile,
    setIsFile,
    handleNewFileName,
    handleDelete,
    handleRename }) => {
    const [showChildren, setShowChildren] = useState(false)

    const handleShowInputFieldToCreateNew = ({ type, name }) => {
        setOpenInputIn(name)
        setShowChildren(true)
        setIsFile(type === 'file')
    }

    const handleShowChildren = () => {
        setShowChildren(!showChildren)
    }

    if (tree.type === 'folder' && !tree.isDeleted) {
        return (
            <>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className={tree.name} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleShowChildren}>
                            <img src={FolderIcon} width={'40px'} />
                            <div className={tree.name + tree.id} style={{ padding: '6px 8px', width: '100px' }}>
                                {`${tree.name}`}
                            </div>
                        </div>

                        <div style={{ marginLeft: '40px' }}>
                            <img
                                src={FileWithPlusSign}
                                style={{ marginLeft: '14px', width: '20px', cursor: 'pointer' }}
                                onClick={() => {
                                    handleShowInputFieldToCreateNew({ type: 'file', name: tree.name })
                                }} />

                            <img
                                src={FolderWithPlusSign}
                                style={{
                                    marginLeft: '14px',
                                    width: '20px',
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    handleShowInputFieldToCreateNew({ type: 'folder', name: tree.name })
                                }} />
                            <img
                                src={BinIcon}
                                style={{
                                    marginLeft: '14px',
                                    width: '18px',
                                    cursor: 'pointer'
                                }}
                                onClick={() => handleDelete({ id: tree.id })}
                            />
                            <img
                                src={EditIcon}
                                style={{
                                    marginLeft: '14px',
                                    width: '18px',
                                    cursor: 'pointer'
                                }}
                                onClick={(e) => handleRename({ e, identifier: tree.name + tree.id, id: tree.id })}
                            />
                        </div>
                    </div>
                    {tree.type === 'folder' &&
                        openInputIn === tree.name &&
                        <InputField
                            id={tree.id}
                            inputRef={inputRef}
                            handleNewFileName={handleNewFileName}
                            handleCreateNewFileOrFolder={handleCreateNewFileOrFolder}
                            type={isFile ? 'file' : 'folder'} />}
                </div>
                {showChildren && <div style={{
                    marginLeft: '20px',
                    marginTop: '4px'
                }}>
                    {tree.children.map((each, i) => {
                        return (
                            <>
                                <Folder
                                    handleDelete={handleDelete}
                                    setIsFile={setIsFile}
                                    isFile={isFile}
                                    key={each.name + '-' + i}
                                    tree={each}
                                    setOpenInputIn={setOpenInputIn}
                                    openInputIn={openInputIn}
                                    inputRef={inputRef}
                                    handleNewFileName={handleNewFileName}
                                    handleCreateNewFileOrFolder={handleCreateNewFileOrFolder}
                                    handleRename={handleRename}
                                />
                            </>
                        )
                    })}
                </div>}
            </>
        )
    } else if (tree.type === 'file' && !tree.isDeleted) {
        return (
            <div style={{
                marginTop: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
            }}>
                <img src={FileIcon} width={'30px'} />
                <div className={tree.name + tree.id} style={{ padding: '6px 8px', width: '140px' }}>
                    {`${tree.name}`}
                </div>
                <div style={{ marginLeft: '40px' }}>
                    <img
                        src={BinIcon}
                        onClick={() => handleDelete({ id: tree.id })}
                        style={{
                            marginLeft: '14px',
                            width: '18px',
                            cursor: 'pointer'
                        }} />
                    <img
                        src={EditIcon}
                        onClick={(e) => handleRename({ e, identifier: tree.name + tree.id, id: tree.id })}
                        style={{
                            marginLeft: '14px',
                            width: '18px',
                            cursor: 'pointer'
                        }} />
                </div>
            </div>
        )
    }
}

export default Folder
