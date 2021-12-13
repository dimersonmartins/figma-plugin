export const getAllTrackings = (): Array<String> => {
  
    let trackings = [];
    for (const node of figma.currentPage.selection) {
        if (node.type === 'INSTANCE' && node.name === "Tracking") {
            const child = node.children[0];
            if (child.type === 'TEXT') {
                trackings.push(child.characters);
            }
        }
    }

    return trackings;
}



export const blipTrackings = () => getAllTrackings();