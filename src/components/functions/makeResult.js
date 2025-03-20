import calcMinWaste from "../functions/calcMinWaste";

function makeResult(wasteWidthArr, wasteHeightArr) {
    const resultValuesObj = {
        waste: 0,
        minWaste: 0,
        parts: 0,
        materialSize: 0,
    };

    let widthIndex = 0;
    let heightIndex = 0;

    console.log(wasteWidthArr);
    console.log(wasteHeightArr);
    
    const solidWidthPart = wasteWidthArr.filter((element) => element.repeat === 1);
    const solidHeightPart = wasteHeightArr.filter((element) => element.repeat === 1);

    const minWasteObj = calcMinWaste(wasteWidthArr);
    resultValuesObj.minWaste = minWasteObj.waste;
    resultValuesObj.parts = minWasteObj.repeat;
    resultValuesObj.materialSize = minWasteObj.size;

    if (wasteWidthArr.length > 0 
        && wasteHeightArr.length > 0
        && solidWidthPart.length > 0
        || solidHeightPart.length > 0
    ) {
        if (solidWidthPart.length > 1 && +solidWidthPart[0].wasteWidth < 20) {
            widthIndex = 1;
        } 
        if (solidHeightPart.length > 1 && +solidHeightPart[0].wasteHeight < 20) {
            heightIndex = 1;
        }

        if (solidWidthPart.length > 0 && solidHeightPart.length > 0) {
            if (solidWidthPart[widthIndex].waste < solidHeightPart[heightIndex].waste
                && solidWidthPart[widthIndex].waste >= 20
                || solidHeightPart[heightIndex].waste >= 20
            ) {
                resultValuesObj.waste = solidWidthPart[widthIndex].waste;
            } else {
                resultValuesObj.waste = solidHeightPart[heightIndex].waste;
            }
        } else if (solidWidthPart.length > 0) {
            resultValuesObj.waste = solidWidthPart[widthIndex].waste;
        } else if (solidHeightPart.length > 0) {
            resultValuesObj.waste = solidHeightPart[heightIndex].waste;
        } 
    } else if (wasteWidthArr.length > 0 && wasteHeightArr.length > 0) {
        resultValuesObj.waste = resultValuesObj.minWaste;

    } else {
        resultValuesObj.waste = 0;
    }

    return resultValuesObj;
}

export default makeResult;