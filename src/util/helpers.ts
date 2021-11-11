export const revomeCharacters = (textId: String): number => {
    textId = textId.replace(/[^a-zA-Z0-9À-ž\s]/g, "");
    const charIds = textId.replace(/[^0-9]+/g, "");
    return parseInt(charIds, 10);
}

export const removeNumbers = (textId: String): string => {
    return textId.replace(/[0-9]/g, '');
}
