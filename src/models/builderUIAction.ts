import { CardContent } from "./builderCardContent";
import { Settings } from "./builderSettings";

export class Action {
    "$id": string;
    "$typeOfContent": string;
    "type": string;
    "settings": Settings;
    "$cardContent": CardContent
}