
import { blipAlterId } from './repository/circleId';
import { scanner } from './repository/scanner';
import { blipTrackings } from './repository/tracking';

async function main(): Promise<void | undefined> {
	await figma.loadFontAsync({ family: "Arial", style: "Regular" });
	await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
	if (figma.editorType === 'figma') {
		figma.showUI(__html__, { width: 700, height: 250 });

		figma.ui.onmessage = msg => {
			if (msg.type === 'blipAlterId') {
				blipAlterId(msg);
			}
			else if (msg.type === 'scanner') {
				scanner();
			}
			else if (msg.type === 'getAllTrackings') {
				let trackings = blipTrackings();
				figma.ui.postMessage({ pluginMessage: { type: "setTrackings",trackings } });
			}
		}
	}

	//figma.closePlugin();
}

main().then();
