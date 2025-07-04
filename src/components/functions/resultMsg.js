function resultMsg(resultObj, checkboxState, edgeValue, isCanvas) {
    const isUnderside = checkboxState['center-1'];
    const isPocket = checkboxState['center-2'];

    let wasteMsg = '';
    let minWasteMsg = '';
    let tip = '';

    console.log('edgeValue', edgeValue);

    const {
        waste,
        minWaste,
        parts,
        solid,
        materialSize
    } = resultObj;

    const partWord = parts % 10 === 1 && parts !== 11 ? 'части' : 'частей';

    if (waste < 1) {
        wasteMsg = `Без отхода (${waste} м²)`;
    } else {
        wasteMsg = `Отход: ${waste} м²`;
    }

    if (minWaste < 1) {
        minWasteMsg = `Без отхода (${minWaste} м²) из ${parts} ${partWord} на материале ${materialSize} мм`;
    } else {
        minWasteMsg = `Минимальный отход ${minWaste} м² из ${parts} ${partWord} на материале ${materialSize} мм`;
    }

    if (waste < 1 && solid) {
        wasteMsg = `Без отхода (${waste} м²)`;
        minWasteMsg = ``;
    }

    if (isPocket) {
        tip = '';
    } 

    if (isUnderside) {
        if (edgeValue > -80 && edgeValue <= 0) {
            tip = `Можно уменьшить на ${80 + edgeValue} мм или наклеить подворот`;
        } else if (edgeValue > 0 && edgeValue <= 50) {
            tip = `Можно уменьшить на ${edgeValue} мм и наклеить подворот`;
        } else {
            tip = ``;
        }
    } else if (!isPocket) {
        if (edgeValue > 0 && edgeValue <= 50) {
            tip = `Можно уменьшить на ${edgeValue} мм`;
        } else {
            tip = ``;
        }
    }

    if (!solid) {
        wasteMsg = ``;
    } else {
        if (waste < 1) {
            tip = ``;
        }
    }

    if (isCanvas && !solid) {
        wasteMsg = ``;
        minWasteMsg = ``;
        tip = `Не помещается на материал`;
    } else if (isCanvas && solid && waste > 1) {
        tip = ``;
        minWasteMsg = ``;
    }

    return {
        wasteMsg,
        minWasteMsg,
        tip
    };
}

export default resultMsg;