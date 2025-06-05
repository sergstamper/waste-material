function calcDimensions(checkboxState, width, height) {
    let tempWidth = parseFloat(width) || 0;
    let tempHeight = parseFloat(height) || 0;

    const underSide = 40;
    const pocket = 100;

    if (checkboxState['left-1']) tempWidth += underSide;
    if (checkboxState['right-1']) tempWidth += underSide;
    if (checkboxState['top-1']) tempHeight += underSide;
    if (checkboxState['bottom-1']) tempHeight += underSide;

    if (checkboxState['left-2']) tempWidth += pocket;
    if (checkboxState['right-2']) tempWidth += pocket;
    if (checkboxState['top-2']) tempHeight += pocket;
    if (checkboxState['bottom-2']) tempHeight += pocket;

    return { tempWidth, tempHeight };
}

export default calcDimensions;