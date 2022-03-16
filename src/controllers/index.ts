import constants from '../util/contants';
import { changeIdentity } from '../repository/changeIdentity';
import { inspect } from '../repository/inspect';
import { getTrackings } from '../repository/analiticys';

const SIZE_OF_SCREEN = { width: 850, height: 600 };

async function startup(): Promise<void> {
    await figma.loadFontAsync({ family: "Arial", style: "Regular" });
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
}

async function main(): Promise<void | undefined> {

    await startup();

    if (figma.editorType === 'figma') {
        figma.showUI(__html__, SIZE_OF_SCREEN);

        figma.ui.onmessage = msg => {
            switch (msg.type) {
                case constants.POSTMESSAGER_GET_ACTIVE_USER:
                    break;
                case constants.POSTMESSAGER_CHANGE_ID:
                    changeIdentity(msg);
                    break;
                case constants.POSTMESSAGER_INSPECT_ELEMENTS:
                    inspect();
                    break;
                case constants.POSTMESSAGER_ALL_TRACKINGS:
                    let trackings = getTrackings();
                    figma.ui.postMessage({ pluginMessage: { type: constants.POSTMESSAGER_RESOLVE_TRACKINGS, trackings } });
                    break;
                case constants.POSTMESSAGER_SET_STORAGE:
                    SetStorage(msg.data.key, msg.data.value);
                    break;
                case constants.POSTMESSAGER_GET_STORAGE:
                    GetStorage(msg.data.key).then((data) => {
                        figma.ui.postMessage({ pluginMessage: { type: constants.POSTMESSAGER_RESOLVE_STORAGE, data } });
                    }).catch((error) => {
                        console.log(error)
                    })
                    break;
            }
        }
    }

    //figma.closePlugin();
}


async function SetStorage(key: string, value: string): Promise<void> {
    figma.clientStorage.setAsync(key, value);
}

async function GetStorage(key: string): Promise<any> {
    return await figma.clientStorage.getAsync(key);
}

main().then();
