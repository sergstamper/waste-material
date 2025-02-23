import filterMinWaste from "./filterMinWaste";

function calcWaste(width, height, material) {
  const currentSizeArr = material.size;
  const length = currentSizeArr.length-1;
  let currentWidth = +width;
  let currentHeight = +height;
  let resultWidth = 0;
  let resultHeight = 0;
  let repeat = 1
  let wasteInWidthArr = [];
  let wasteInHeightArr = [];

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

  currentSizeArr.forEach((size) => {
    repeat = Math.ceil(currentWidth/size);
    if (repeat > 1) {
      resultWidth = currentWidth/repeat;
      resultHeight = currentHeight*repeat;
    } else {
      resultWidth = currentWidth;
      resultHeight = currentHeight;
    }

    const wasteWidth = size - resultWidth;
    const wasteAreaInWidth = (wasteWidth / 1000) * (resultHeight / 1000);

    wasteInWidthArr.push({
      size: size,
      repeat: repeat,
      wasteWidth: wasteWidth.toFixed(2),
      waste: wasteAreaInWidth.toFixed(2)
    });
  });

  currentSizeArr.forEach((size) => {
    repeat = Math.ceil(currentHeight/size);
    if (repeat > 1) {
      resultHeight = currentHeight/repeat;
      resultWidth = currentWidth*repeat;
    } else {
      resultHeight = currentHeight;
      resultWidth = currentWidth;
    }

    const wasteHeight = size - resultHeight;
    const wasteAreaInHeight = (wasteHeight / 1000) * (resultWidth / 1000);

    wasteInHeightArr.push({
      size: size,
      repeat: repeat,
      wasteHeight: wasteHeight.toFixed(2),
      waste: wasteAreaInHeight.toFixed(2)
    });
  });

  console.log(wasteInWidthArr);
  console.log(wasteInHeightArr);

  const filteredWasteInWidthArr = filterMinWaste(wasteInWidthArr, 'wasteWidth');
  const filteredWasteInHeightArr = filterMinWaste(wasteInHeightArr, 'wasteHeight');

  return { filteredWasteInWidthArr, filteredWasteInHeightArr };
}

export default calcWaste;