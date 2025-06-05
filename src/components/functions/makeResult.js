import calcMinWaste from "../functions/calcMinWaste";

function makeResult(wasteWidthArr, wasteHeightArr) {
    const resultValuesObj = {
        waste: 0,
        minWaste: 0,
        parts: 0,
        solid: false,
        materialSize: 0
    };

    const solidWidthPart = wasteWidthArr.filter((element) => element.repeat === 1); //Select objects without division
    const solidHeightPart = wasteHeightArr.filter((element) => element.repeat === 1);
    
    console.log('solidWidthPart: ', solidWidthPart);
    console.log('solidHeightPart: ', solidHeightPart);

    const minWasteObj = calcMinWaste(wasteWidthArr);
    resultValuesObj.minWaste = minWasteObj.waste;
    resultValuesObj.parts = minWasteObj.repeat; //NO. Parts can be smaller.
    resultValuesObj.materialSize = minWasteObj.size;

    if (wasteWidthArr.length > 0 
        && wasteHeightArr.length > 0
        && solidWidthPart.length > 0
        || solidHeightPart.length > 0 //!!! Brokes with OR instruction
    ) {
        if (solidWidthPart.length > 0 && solidHeightPart.length > 0) {
            if (solidWidthPart[0].waste < solidHeightPart[0].waste) 
            {
                resultValuesObj.waste = solidWidthPart[0].waste;
            } else {
                resultValuesObj.waste = solidHeightPart[0].waste;
            }
        } else if (solidWidthPart.length > 0) {
            resultValuesObj.waste = solidWidthPart[0].waste;
        } else if (solidHeightPart.length > 0) {
            resultValuesObj.waste = solidHeightPart[0].waste;
        } 
        resultValuesObj.solid = true;
    } else if (wasteWidthArr.length > 0 && wasteHeightArr.length > 0) {
        resultValuesObj.waste = resultValuesObj.minWaste;

    } else {
        resultValuesObj.waste = 0;
    }

    console.log('resultValuesObj: ', resultValuesObj);
    return resultValuesObj;
}

export default makeResult;