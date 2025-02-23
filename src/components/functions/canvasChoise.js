function canvasChoise(value, width, height, isStandardChecked) {
    let canvWidth = +width;
    let canvHeight = +height;
    let cutSmall = isStandardChecked ? 50 : 0;
    let cutBig = isStandardChecked ? 80 : 0;

    if (value === '15x30') {
        canvWidth = +width + 90 - cutSmall;
        canvHeight = +height + 90 - cutSmall;
    } else if (value === '17x45') {
        canvWidth = +width + 124 - cutBig;
        canvHeight = +height + 124 - cutBig;
    } else if (value === '23x45') {
        canvWidth = +width + 136 - cutBig;
        canvHeight = +height + 136 - cutBig;
    }

    return { canvWidth, canvHeight };
}

export default canvasChoise;