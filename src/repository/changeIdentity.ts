import { revomeCharacters, removeNumbers } from '../util/helpers';
import { Indentity } from '../models/indentity';

export const getAllIdentity = (initialcharacter: String): Array<Indentity> => {

    let listIds = new Array<Indentity>();
    let oldId = '';

    for (const node of figma.currentPage.selection) {

        if (node.type === 'INSTANCE' && (node.name === 'Marcação' || node.name === 'ID')) {

            const childrens = node.children;
            
            for (const children of childrens) {
                if (children.type === 'TEXT') {
                    let circlemodel = new Indentity();
                    circlemodel.Id = children.id;
                    circlemodel.Value = 0;
                    circlemodel.OriginalValue = children.characters;
                    circlemodel.x = node.x;
                    circlemodel.y = node.y;
                    listIds.push(circlemodel);
                }
            }
        }
    }

    let sortPositionList = listIds.sort(function sortByPosition(a, b) {
        if (a.y == b.y) return a.x - b.x;
        return a.y - b.y;
    });

    sortPositionList.forEach(element => {
        let charIds = revomeCharacters(element.OriginalValue);
        const initiChar = revomeCharacters(initialcharacter);

        if (initiChar > 0) {
            charIds = initiChar;
        }

        let id = 0;

        if (oldId !== '') {
            const nextId = sortPositionList.find(node => node.Id === oldId);
            id = (nextId.Value + 1)
        } else {
            id = charIds;
        }

        element.Value = id;
        oldId = element.Id;

    });

    return sortPositionList;
}

export const setIdentity = (sortPositionList: Array<Indentity>, initiChar: String): void => {

    sortPositionList.forEach(el => {
        const child = figma.currentPage.selection.find(node => node.type === 'INSTANCE' && (node.name === 'Marcação' || node.name === 'ID') && node.children.find(c => c.id == el.Id));
        if (child.type === 'INSTANCE' && (child.name === 'Marcação' || child.name === 'ID')) {
            const childId = child.children.find(c => c.id == el.Id);
            if (childId.type === 'TEXT') {
                const circlemodel = el;
                const charId = circlemodel.Value.toString();
                let newId = '';
                for (let index = 0; index < charId.length; index++) {
                    const iid = charId[index];
                    newId += iid + '.';
                }
                childId.characters = `${initiChar}.${newId.substring(0, newId.length - 1)}`;
            }
        }
    });
}

export const changeIdentity = (msg) => {
    const listIds = getAllIdentity(msg.initialcharacter);
    const initiChar = removeNumbers(msg.initialcharacter);
    setIdentity(listIds, initiChar);
}