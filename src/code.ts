
import { blipAlterId } from './repository/circleId';

async function main(): Promise<void | undefined> {
	await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
	if (figma.editorType === 'figma') {
		figma.showUI(__html__, { width: 500 });
		blipAlterId();
	}
}

figma.ui.onmessage = msg => {
	if (msg.type === 'create-shapes') {
		for (const node of figma.currentPage.selection) {
			if (node.type === 'GROUP' && node.name === 'Mensagems') {
				for (const child of node.children) {
					//console.log(node.name)
				}
			}
		}
	}
	//figma.closePlugin();
};

main().then();
