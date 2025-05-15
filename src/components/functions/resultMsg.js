function resultMsg(resultObj, checkboxState, edgeValue) {
    let isUnderside = checkboxState['center-1'];
    let wasteMsg = '';
    let minWasteMsg = '';
    let tip = '';

    console.log('isUnderside', isUnderside);

    const {
        waste,
        minWaste,
        parts,
        materialSize
    } = resultObj;

    if (waste < 1) {
        wasteMsg = `Без отхода (${waste} м²)`;
    } else {
        wasteMsg = `${waste} м²`;
    }

    if (minWaste < 1) {
        minWasteMsg = `Без отхода (${minWaste} м²) из ${parts} частей на материале ${materialSize} мм`;
    } else {
        minWasteMsg = `Минимальный отход ${minWaste} м² из ${parts} частей на материале ${materialSize} мм`;
    }

    if (waste > 1 && edgeValue > 0 && isUnderside
        || waste < 1 && edgeValue > 0 && isUnderside
    ) {
        tip = `Можно уменьшить на ${edgeValue} мм и наклеить подворот`;
    } else if (waste > 1 && edgeValue > 0 && !isUnderside
        || waste < 1 && edgeValue > 0 && !isUnderside
    ) {
        tip = `Можно уменьшить на ${edgeValue} мм`;
    } else {
        tip = ``;
    }

    return {
        wasteMsg,
        minWasteMsg,
        tip
    };
}

export default resultMsg;