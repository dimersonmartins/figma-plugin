
export const getAllComponnets = (): void => {

    for (const node of figma.currentPage.selection) {
        console.log('name: ', node.name)
        console.log('x: ', node.x)
        console.log('y: ', node.y)

        if (node.type === 'INSTANCE') {
            const childrens = node.children;
            for (const children of childrens) {
                console.log('children: ', children)
            }
        }


    }
}



export const scanner = () => {
    figma.ui.onmessage = msg => {
        if (msg.type === 'scanner') {
            getAllComponnets();
        }
    }
}