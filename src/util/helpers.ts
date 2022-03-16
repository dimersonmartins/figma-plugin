export const revomeCharacters = (textId: String): number => {
    textId = textId.replace(/[^a-zA-Z0-9À-ž\s]/g, "");
    const charIds = textId.replace(/[^0-9]+/g, "");
    return parseInt(charIds, 10);
}

export const removeNumbers = (textId: String): string => {
    return textId.replace(/[0-9]/g, '');
}

export const Json2Csv = (data: Array<any>): string => {
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(data[0]);
    const csv = [
        header.join(','),
        ...data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer).replace(/"/gmi,"")).join(','))
    ].join('\r\n')

    return csv;
}
