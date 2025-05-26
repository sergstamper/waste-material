import filterMinWaste from "./filterMinWaste";
import formingResArr from "./formingResArr";

function calcWaste(width, height, material) {
  const currentSizeArr = material.size;
  const length = currentSizeArr.length-1;
  let currentWidth = +width;
  let currentHeight = +height;

  if (currentWidth > +currentSizeArr[length] 
    && currentHeight > +currentSizeArr[length]) {
    if (currentHeight > currentWidth) {
      [currentWidth, currentHeight] = [currentHeight, currentWidth];    
    }
  } else if (currentWidth > +currentSizeArr[length] 
  || currentHeight > +currentSizeArr[length]) {
    if (currentHeight > currentWidth) {
      [currentWidth, currentHeight] = [currentHeight, currentWidth];    
    }
  } else if (currentHeight > currentWidth) {
    [currentWidth, currentHeight] = [currentHeight, currentWidth];  
  }

  console.log('currentWidth: ', currentWidth);
  console.log('currentHeight: ', currentHeight);

  const wasteInWidthArr = formingResArr(currentWidth, currentHeight, material, 'width'); //Why I transit repeat here?
  const wasteInHeightArr = formingResArr(currentWidth, currentHeight, material, 'height');

  console.log('wasteInWidthArr: ', wasteInWidthArr);
  console.log('wasteInHeightArr: ', wasteInHeightArr);

  const filteredWasteInWidthArr = filterMinWaste(wasteInWidthArr, 'wasteWidth');
  const filteredWasteInHeightArr = filterMinWaste(wasteInHeightArr, 'wasteHeight');

  console.log('filteredWasteInWidthArr: ', filteredWasteInWidthArr);
  console.log('filteredWasteInHeightArr: ', filteredWasteInHeightArr);
  console.log('------------------------');

  return { filteredWasteInWidthArr, filteredWasteInHeightArr };
}

export default calcWaste;