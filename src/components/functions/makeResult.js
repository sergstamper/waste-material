import calcMinWaste from "../functions/calcMinWaste";

function makeResult(wasteWidthArr, wasteHeightArr, width, height, currentMaterial) {
    const resultValuesObj = {
        waste: 0,
        minWaste: 0,
        parts: 0,
        solid: false,
        materialSize: 0
        // edgeValues: []
    };

    // const nonZeroWidthArr = wasteWidthArr.filter((element) => element.wasteWidth >= 20); //Remove objects with zero waste
    // const nonZeroHeightArr = wasteHeightArr.filter((element) => element.wasteHeight >= 20);

    const solidWidthPart = wasteWidthArr.filter((element) => element.repeat === 1); //Select objects without division
    const solidHeightPart = wasteHeightArr.filter((element) => element.repeat === 1);
    
    console.log('solidWidthPart: ', solidWidthPart);
    console.log('solidHeightPart: ', solidHeightPart);
    // const solidWidthPart = nonZeroWidthArr.filter((element) => element.repeat === 1); //Select objects without division
    // const solidHeightPart = nonZeroHeightArr.filter((element) => element.repeat === 1);

    // const edgeWidthValue = currentMaterial
    //     .filter((element) => {(+element.size - +width) < 20 && element.repeat === 1
    //         // console.log('edgeWidthValue', element.size, +element.size - +width, width);
    //     }) //Find objects with edge values (2500, 3200 etc.)
    //     .map(({size}) => size)[0] || 0;
    // const edgeHeightValue = currentMaterial
    //     .filter((element) => {(+element.size - +height) < 20 && element.repeat === 1
    //         // console.log('edgeHeightValue', element.size, +element.size - +height, height);
    //     })
    //     .map(({size}) => size)[0] || 0;

        // console.log('Edge values: ', edgeWidthValue, edgeHeightValue);
        // console.log('width, height: ', width, height);
        // console.log('Waste in width', wasteWidthArr);
        // console.log('Waste in height', wasteHeightArr);

    // const edgeWidthValue = wasteWidthArr
    //     .filter((element) => +element.wasteWidth < 20 && element.repeat === 1) //Find objects with edge values (2500, 3200 etc.)
    //     .map(({size}) => size)[0] || 0;
    // const edgeHeightValue = wasteHeightArr
    //     .filter((element) => +element.wasteHeight < 20 && element.repeat === 1)
    //     .map(({size}) => size)[0] || 0;

    // resultValuesObj.edgeValues = [+edgeWidthValue, +edgeHeightValue];

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