import { revomeCharacters, removeNumbers } from '../util/helpers';
import { CircleModel } from '../models/circlemodel';

export const getAllCircleIds = (initialcharacter: String): Array<CircleModel> => {

    let listIds = [];
    let oldId = '';
    

    for (const node of figma.currentPage.selection) {

        if (node.type === 'GROUP' && node.name === 'Mensagems') {
            for (const child of node.children) {
                //console.log(node.name)
            }
        }

        if (node.type === 'GROUP' && node.name === 'Marcação') {

            const childrens = node.children;

            for (const children of childrens) {
                if (children.type === 'TEXT') {

                    let charIds = revomeCharacters(children.characters);
                    const initiChar = revomeCharacters(initialcharacter);

                    if (initiChar > 0) {
                        charIds = initiChar;
                    }

                    let id = 0;

                    if (listIds.length > 0) {
                        const nextId = listIds.find(node => node.Id === oldId);
                        id = (nextId.Value + 1)
                    } else {
                        id = charIds;
                    }

                    let circlemodel = new CircleModel();
                    circlemodel.Id = children.id;
                    circlemodel.Value = id;

                    listIds.push(circlemodel);

                    oldId = children.id;
                }
            }
        }
    }

    return listIds;
}

export const alterCircleIds = (listIds: Array<CircleModel>, initiChar: String): void => {
    figma.currentPage.selection.forEach(node => {
        if (node.type === 'GROUP' && node.name === 'Marcação') {
            const childrens = node.children;
            for (const children of childrens) {
                if (children.type === 'TEXT') {

                    const circlemodel = listIds.find(node => node.Id === children.id);
                    const charId = circlemodel.Value.toString();

                    let newId = '';

                    for (let index = 0; index < charId.length; index++) {
                        const iid = charId[index];
                        newId += iid + '.';
                    }

                    children.textAlignHorizontal = 'CENTER'
                    children.textAlignVertical = 'CENTER'
                    children.characters = `${initiChar}.${newId.substring(0, newId.length - 1)}`;

                }
            }
        }
    })
}

export const blipAlterId = () => {
    console.log('sdasd')
    figma.ui.onmessage = msg => {
        if (msg.type === 'blipAlterId') {
            const listIds = getAllCircleIds(msg.initialcharacter);
            const initiChar = removeNumbers(msg.initialcharacter);
            alterCircleIds(listIds, initiChar);
        }
    }
}