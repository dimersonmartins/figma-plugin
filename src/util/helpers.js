export const revomeCharacters = (textId) => {
    textId = textId.replace(/[^a-zA-Z0-9À-ž\s]/g, "");
    const charIds = textId.replace(/[^0-9]+/g, "");
    return parseInt(charIds, 10);
};
export const removeNumbers = (textId) => {
    return textId.replace(/[0-9]/g, '');
};
