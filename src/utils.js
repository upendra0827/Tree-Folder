export const calculateEmi = ({ p, r, n }) => {
    const monthlyInterestRate = r / 1200
    const numerator = p * monthlyInterestRate * ((1 + monthlyInterestRate) ** n)
    const denominator = ((1 + monthlyInterestRate) ** n) - 1
    return denominator === 0 ? 0 : numerator / denominator
}

export const folderJson = {
    "name": "root",
    "type": "folder",
    "id": "1",
    "children": [
        {
            "name": "src",
            "type": "folder",
            "id": "2",
            "children": [
                {
                    "name": "components",
                    "type": "folder",
                    "id": "3",
                    "children": [
                        {
                            "name": "Header.js",
                            "type": "file",
                            "id": "4"
                        },
                        {
                            "name": "Footer.js",
                            "type": "file",
                            "id": "5"
                        }
                    ]
                },
                {
                    "name": "App.js",
                    "type": "file",
                    "id": "6"
                },
                {
                    "name": "index.js",
                    "type": "file",
                    "id": "7"
                }
            ]
        },
        {
            "name": "public",
            "type": "folder",
            "id": "8",
            "children": [
                {
                    "name": "index.html",
                    "type": "file",
                    "id": "9"
                }
            ]
        },
        {
            "name": ".gitignore",
            "type": "file",
            "id": "10"
        },
        {
            "name": "package.json",
            "type": "file",
            "id": "11"
        }
    ]
}


export const treeTraversals = () => {

    const addToTreeTraversal = ({ newFileOrFolder, id, tree }) => {

        const cloneTree = { ...tree }

        function addToTree(root) {
            if (root.id === id) {
                root.children.unshift(newFileOrFolder)
                return
            } else {
                if (root.type === 'folder') {
                    for (let i of root.children) {
                        addToTree(i)
                    }
                }
            }
        }

        addToTree(cloneTree)
        return cloneTree
    }

    const deleteFromTreeTraversal = ({ id, tree }) => {
        const cloneTree = { ...tree }

        const deleteFromTree = (root) => {
            if (root.id === id) {
                return true
            } else {
                if (root.type === 'folder') {
                    for (let i of root.children) {
                        if (deleteFromTree(i)) {
                            root.children = root.children.filter(each => each.id != id)
                            return
                        }
                    }
                }
            }
        }

        deleteFromTree(cloneTree)

        return cloneTree
    }

    const renameTraversal = ({ id, val, tree }) => {
        const cloneTree = { ...tree }

        const rename = (root) => {
            if (root.id === id) {
                root.name = val
            } else {
                if (root.children) {
                    root.children.map(child => {
                        rename(child)
                    })
                }
            }
        }

        rename(cloneTree)

        return cloneTree
    }

    return { addToTreeTraversal, deleteFromTreeTraversal, renameTraversal }
}

