import calcMinWaste from "../functions/calcMinWaste";

function makeResult(wasteWidthArr, wasteHeightArr) {
    const resultValuesObj = {
        waste: 0,
        minWaste: 0,
        parts: 0,
        materialSize: 0,
        edgeValues: []
    };

    console.log(wasteWidthArr);
    console.log(wasteHeightArr);
    
    const nonZeroWidthArr = wasteWidthArr.filter((element) => element.wasteWidth >= 20); //Remove objects with zero waste
    const nonZeroHeightArr = wasteHeightArr.filter((element) => element.wasteHeight >= 20);

    const solidWidthPart = nonZeroWidthArr.filter((element) => element.repeat === 1); //Select objects without division
    const solidHeightPart = nonZeroHeightArr.filter((element) => element.repeat === 1);

    const edgeWidthValue = wasteWidthArr
        .filter((element) => +element.wasteWidth < 20 && element.repeat === 1) //Find objects with edge values (2500, 3200 etc.)
        .map(({size}) => size)[0] || 0;
    const edgeHeightValue = wasteHeightArr
        .filter((element) => +element.wasteHeight < 20 && element.repeat === 1)
        .map(({size}) => size)[0] || 0;

    resultValuesObj.edgeValues = [+edgeWidthValue, +edgeHeightValue];

    const minWasteObj = calcMinWaste(wasteWidthArr);
    resultValuesObj.minWaste = minWasteObj.waste;
    resultValuesObj.parts = minWasteObj.repeat;
    resultValuesObj.materialSize = minWasteObj.size;

    if (wasteWidthArr.length > 0 
        && wasteHeightArr.length > 0
        && solidWidthPart.length > 0
        || solidHeightPart.length > 0
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
    } else if (wasteWidthArr.length > 0 && wasteHeightArr.length > 0) {
        resultValuesObj.waste = resultValuesObj.minWaste;

    } else {
        resultValuesObj.waste = 0;
    }

    console.log('result object', resultValuesObj);

    return resultValuesObj;
}

export default makeResult;