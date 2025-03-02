function formingResArr(
  currentWidth, 
  currentHeight, 
  material, 
  repeat, 
  direction) {

  const wasteArr = [];
  const currentMaterialType = material.type;
  const currentSizeArr = material.size;
  
  let width = 0; 
  let height = 0;
  let resultWidth = 0;
  let resultHeight = 0;
  let key = 'wasteWidth';

  if (direction === 'width') {
    width = currentWidth;
    height = currentHeight;
  } else {
    width = currentHeight;
    height = currentWidth;
    key = 'wasteHeight'
  }

  currentSizeArr.forEach((size) => {
    repeat = Math.ceil(width/size);
    let add = 0;
    
    if (repeat > 1) {
      if (currentMaterialType === 'banner') {
        add = repeat === 2 ? 40 : 80;
      } else if (currentMaterialType === 'vinyl') {
        add = repeat === 2 ? 5 : 10;
      }

      resultWidth = width/repeat + add;
      resultHeight = height*repeat;
    } else {
      resultWidth = width;
      resultHeight = height;
    }

    const wasteValue = size - resultWidth;
    const wasteArea = (wasteValue / 1000) * (resultHeight / 1000);

    if (wasteValue >= 0) {
      wasteArr.push({
        size: size,
        repeat: repeat,
        [key]: wasteValue.toFixed(2),
        waste: wasteArea.toFixed(2)
      });
    }
  });

  return wasteArr;
}

export default formingResArr;