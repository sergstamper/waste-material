import filterMinWaste from "./filterMinWaste";
import formingResArr from "./formingResArr";

function calcWaste(width, height, material) {
  const currentSizeArr = material.size;
  const length = currentSizeArr.length-1;
  let currentWidth = +width;
  let currentHeight = +height;
  let repeat = 1

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

  const wasteInWidthArr = formingResArr(currentWidth, currentHeight, material, repeat, 'width');
  const wasteInHeightArr = formingResArr(currentWidth, currentHeight, material, repeat, 'height');

  console.log(wasteInWidthArr);
  console.log(wasteInHeightArr);

  const filteredWasteInWidthArr = filterMinWaste(wasteInWidthArr, 'wasteWidth');
  const filteredWasteInHeightArr = filterMinWaste(wasteInHeightArr, 'wasteHeight');

  return { filteredWasteInWidthArr, filteredWasteInHeightArr };
}

export default calcWaste;