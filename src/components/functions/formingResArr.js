function formingResArr(
  currentWidth, 
  currentHeight, 
  material, 
  direction) {

  const wasteArr = [];
  const currentMaterialType = material.type;
  const currentSizeArr = material.size;
  
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

    // Функция для проверки, помещается ли макет с текущим количеством частей
    const calculateParts = (parts) => {
      if (parts < 1) return null; // Не должно происходить, но на всякий случай

      let addition = 0;
      if (parts > 1) {
        if (currentMaterialType === 'banner') {
          addition = parts === 2 ? 40 : 80; 
        } else if (currentMaterialType === 'vinyl') {
          addition = parts === 2 ? 5 : 10;
        }
      }

      const partWidth = width / parts + addition;
      if (partWidth > size) {
        return calculateParts(parts - 1); // Рекурсивно пробуем меньше частей
      }

      return {
        parts,
        addition,
        partWidth
      };
    };

    const result = calculateParts(repeat);
    if (!result) return; // Не удалось разместить (маловероятно, но возможно)

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

    // console.log('Size: ', size);
    // console.log('Width: ', width);
    // console.log('Repeat: ', repeat);
    // console.log('Result Width: ', resultWidth);
    // console.log('Waste Value: ', wasteValue);
    // console.log('Waste Area: ', wasteArea);
    // console.log('-----------------------');

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

// function formingResArr(
//   currentWidth, 
//   currentHeight, 
//   material, 
//   direction) {

//   const wasteArr = [];
//   const currentMaterialType = material.type;
//   const currentSizeArr = material.size;
  
//   let width = 0; 
//   let height = 0;
//   let resultWidth = 0;
//   let resultHeight = 0;
//   let key = 'wasteWidth';
//   let repeat = 1;

//   if (direction === 'width') {
//     width = currentWidth;
//     height = currentHeight;
//   } else {
//     width = currentHeight;
//     height = currentWidth;
//     key = 'wasteHeight'
//   }

//   currentSizeArr.forEach((size) => {
//     repeat = Math.ceil(width/size); //Maybe move declare of repeat here?
//     let add = 0;

//     if (repeat > 1) {
//       if (currentMaterialType === 'banner') {
//         add = repeat === 2 ? 40 : 80; //NOOOOOO!!!!!!!
//         if ((width / repeat + add) > size) {
//           repeat -= 1;
//           add = repeat === 2 ? 40 : 80;
//         }
//       } else if (currentMaterialType === 'vinyl') {
//         add = repeat === 2 ? 5 : 10;
//         if ((width / repeat + add) > size) {
//           repeat -= 1;
//           add = repeat === 2 ? 5 : 10;
//         }
//       }

//       resultWidth = width/repeat + add;
//       resultHeight = height*repeat;
//     } else {
//       resultWidth = width;
//       resultHeight = height;
//     }

//     const wasteValue = size - resultWidth;
//     const wasteArea = (wasteValue / 1000) * (resultHeight / 1000);

//     console.log('Size: ', size);
//     console.log('Width: ', width);
//     console.log('Repeat: ', repeat);
//     console.log('Result Width: ', resultWidth);
//     console.log('Waste Value: ', wasteValue);
//     console.log('Waste Area: ', wasteArea);
//     console.log('-----------------------');

//     if (wasteValue >= 20) {
//       wasteArr.push({
//         size: size,
//         repeat: repeat,
//         [key]: wasteValue.toFixed(2),
//         waste: wasteArea.toFixed(2)
//       });
//     }
//   });

//   return wasteArr;
// }

// export default formingResArr;