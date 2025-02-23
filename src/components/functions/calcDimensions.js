function calcDimensions(checkboxState, width, height) {
    let tempWidth = parseFloat(width) || 0;
    let tempHeight = parseFloat(height) || 0;

    if (checkboxState['left-1']) tempWidth += 40;
    if (checkboxState['right-1']) tempWidth += 40;
    if (checkboxState['top-1']) tempHeight += 40;
    if (checkboxState['bottom-1']) tempHeight += 40;

    if (checkboxState['left-2']) tempWidth += 100;
    if (checkboxState['right-2']) tempWidth += 100;
    if (checkboxState['top-2']) tempHeight += 100;
    if (checkboxState['bottom-2']) tempHeight += 100;

    return { tempWidth, tempHeight };
}

export default calcDimensions;