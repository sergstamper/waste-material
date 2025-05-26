function resultMsg(resultObj, checkboxState, edgeValue) {
    const isUnderside = checkboxState['center-1'];
    const isPocket = checkboxState['center-2'];

    let wasteMsg = '';
    let minWasteMsg = '';
    let tip = '';

    console.log('isUnderside', isUnderside);
    console.log('isPocket', isPocket);

    const {
        waste,
        minWaste,
        parts,
        solid,
        materialSize
    } = resultObj;

    if (waste < 1) {
        wasteMsg = `Без отхода (${waste} м²)`;
    } else {
        wasteMsg = `Отход: ${waste} м²`;
    }

    if (minWaste < 1) {
        minWasteMsg = `Без отхода (${minWaste} м²) из ${parts} частей на материале ${materialSize} мм`;
    } else {
        minWasteMsg = `Минимальный отход ${minWaste} м² из ${parts} частей на материале ${materialSize} мм`;
    }

    if (waste < 1 && solid) {
        wasteMsg = `Без отхода (${waste} м²)`; //!!!
        minWasteMsg = ``;
    }

    if (isPocket) {
        tip = '';
    } 

    if (isUnderside) {
        if (waste > 1 && edgeValue > 0 || waste < 1 && edgeValue > 0) {
            tip = `Можно уменьшить на ${edgeValue} мм и наклеить подворот`;
        } else {
            tip = ``;
        }
    } else if (!isPocket) {
        if (waste > 1 && edgeValue > 0 || waste < 1 && edgeValue > 0) {
            tip = `Можно уменьшить на ${edgeValue} мм`;
        } else {
            tip = ``;
        }
    }

    if (!solid) {
        wasteMsg = ``; //!!!
    }

    return {
        wasteMsg,
        minWasteMsg,
        tip
    };
}

export default resultMsg;