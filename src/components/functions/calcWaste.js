import filterMinWaste from "./filterMinWaste";
import formingResArr from "./formingResArr";

function calcWaste(width, height, material) {
  const currentSizeArr = material.size;
  const length = currentSizeArr.length-1;
  let currentWidth = +width;
  let currentHeight = +height;
  // let repeat = 1 //Why repeat is there?

  if (currentWidth > +currentSizeArr[length] 
    && currentHeight > +currentSizeArr[length]) {
    if (currentHeight > currentWidth) {
      const temp = currentWidth;
      currentWidth = currentHeight;
      currentHeight = temp;
    }
  } else if (currentWidth > +currentSizeArr[length] 
  || currentHeight > +currentSizeArr[length]) {
    if (currentHeight > currentWidth) {
      const temp = currentWidth;
      currentWidth = currentHeight;
      currentHeight = temp;
    }
  } else if (currentHeight > currentWidth) {
    const temp = currentWidth;
    currentWidth = currentHeight;
    currentHeight = temp;
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