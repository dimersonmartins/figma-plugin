import { JsonWebKey } from 'crypto';
import { revomeCharacters, removeNumbers } from '../util/helpers';

export const getAllCircleIds = (initialcharacter: String): Array<JsonWebKey> => {

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
                        const nextId = listIds.find(node => node.id === oldId);
                        id = (nextId.value + 1)
                    } else {
                        id = charIds;
                    }

                    listIds.push({ id: children.id, value: id });
                    oldId = children.id;
                }
            }
        }
    }

    return listIds;
}

export const alterCircleIds = (listIds: Array<JsonWebKey>, initiChar: String): void => {
    figma.currentPage.selection.forEach(node => {
        if (node.type === 'GROUP' && node.name === 'Marcação') {
            const childrens = node.children;
            for (const children of childrens) {
                if (children.type === 'TEXT') {

                    const id = listIds.find(node => node.id === children.id);
                    const charId = id.value.toString();

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