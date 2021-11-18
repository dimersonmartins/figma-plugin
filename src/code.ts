
import { blipAlterId } from './repository/circleId';
import { scanner } from './repository/scanner';

async function main(): Promise<void | undefined> {
	await figma.loadFontAsync({ family: "Arial", style: "Regular" });
	if (figma.editorType === 'figma') {
		figma.showUI(__html__, { width: 500, height: 210 });

		figma.ui.onmessage = msg => {
			if (msg.type === 'blipAlterId') {
				blipAlterId(msg);
			}
			else if (msg.type === 'scanner') {
				scanner();
			}
		}
	}

	//figma.closePlugin();
}

main().then();
