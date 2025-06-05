function formingResArr(
  currentWidth, 
  currentHeight, 
  material, 
  direction) {

  const wasteArr = [];
  const currentMaterialType = material.type;
  const currentSizeArr = material.size;

  const bannerGluing = 40;
  const vinylGluing = 5;
  
  let width = 0; 
  let height = 0;
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
    let repeat = Math.ceil(width / size);
    let add = 0;
    let resultWidth = 0;
    let resultHeight = 0;

    const calculateParts = (parts) => {
      if (parts < 1) return null;

      let addition = 0;
      if (parts > 1) {
        if (currentMaterialType === 'banner') {
          addition = parts === 2 ? bannerGluing : bannerGluing * 2;
        } else if (currentMaterialType === 'vinyl') {
          addition = parts === 2 ? vinylGluing : vinylGluing * 2;
        }
      }

      const partWidth = width / parts + addition;
      if (partWidth > size) {
        return calculateParts(parts - 1);
      }

      return {
        parts,
        addition,
        partWidth
      };
    };

    const result = calculateParts(repeat);
    if (!result) return;

    repeat = result.parts;
    add = result.addition;

    if (repeat > 1) {
      resultWidth = width / repeat + add;
      resultHeight = height * repeat;
    } else {
      resultWidth = width;
      resultHeight = height;
    }

    const wasteValue = size - resultWidth;
    const wasteArea = (wasteValue / 1000) * (resultHeight / 1000);

    if (wasteValue >= 20) {
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
