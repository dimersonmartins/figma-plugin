
import { blipAlterId } from './repository/circleId';
import { scanner } from './repository/scanner';

async function main(): Promise<void | undefined> {
	await figma.loadFontAsync({ family: "Arial", style: "Regular" });
	if (figma.editorType === 'figma') {
		figma.showUI(__html__, { width: 500, height: 210 });
		blipAlterId();
		//scanner();
	}

	//figma.closePlugin();
}

main().then();
