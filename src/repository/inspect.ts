import { InspectElement } from '../models/InspectElement'
import constants from '../util/contants'
export const getAllComponnets = (): void => {
    let elements = []
    for (const node of figma.currentPage.selection) {
        let element = new InspectElement()

        element.type = node.type
        element.name = node.name
        element.positionX = node.x
        element.positionY = node.y

       
        if (node.type === 'INSTANCE') {
            console.log(JSON.stringify(node.children))
            const childrens = node.children;
            for (const children of childrens) {
                // element.childrens.push(children)
                console.log(JSON.stringify(children))
                if (children.type === 'TEXT') {
                    console.log(children.characters)
                }
            }
        }
        elements.push(element)
    }
    figma.ui.postMessage({ pluginMessage: { type: constants.POSTMESSAGER_GET_INSPECT_ELEMENTS, elements } });
}



export const inspect = () => getAllComponnets();