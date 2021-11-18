var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { blipAlterId } from './repository/circleId';
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield figma.loadFontAsync({ family: "Roboto", style: "Regular" });
        if (figma.editorType === 'figma') {
            figma.showUI(__html__, { width: 500 });
            blipAlterId();
        }
    });
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
