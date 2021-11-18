export const getAllTrackings = (initialcharacter: String): Array<String> => {
    let listIds = [];
    for (const node of figma.currentPage.selection) {
        if (node.type === 'TEXT') {
            listIds.push(node.characters);
        }
    }
    return listIds;
}

export const blipTrackings = () => {
    figma.ui.onmessage = msg => {
        if (msg.type === 'getAllTrackings') {
            const listIds = getAllTrackings(msg.initialcharacter);
            console.log(JSON.stringify(listIds))
        }
    }
}