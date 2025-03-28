function resultMsg(resultObj, currentMaterial, checkboxState) {
    let isUnderside = false;
    let wasteMsg = '';
    let minWasteMsg = '';
    let tip = '';

    if (checkboxState['center-1']) {
        isUnderside = true;
    }

    console.log(checkboxState);

    const {
        waste,
        minWaste,
        parts,
        materialSize,
        edgeValues
    } = resultObj;

    const edgeValue1 = edgeValues[0];
    const edgeValue2 = edgeValues[1];

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

    if (edgeValue1 > 0 || edgeValue2 > 0 && currentMaterial.size.includes(edgeValue1) && waste > 1) {
        console.log(isUnderside);
        if (checkboxState['center-1']) {
            tip = `Можно уменьшить на 20 мм и наклеить подворот`;
            console.log('YESS'); //!!
        } else {
            tip = `Можно уменьшить на 20 мм`;
        }
    }

    return {
        wasteMsg,
        minWasteMsg,
        tip
    };
}

export default resultMsg;