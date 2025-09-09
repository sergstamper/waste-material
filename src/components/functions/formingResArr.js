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
    let minParts = Math.ceil(width / size);
    let bestSolution = null;

    for (let parts = minParts; parts <= minParts + 10; parts++) {
      let addition = 0;
      if (parts > 1) {
        if (currentMaterialType === 'banner') {
          addition = parts === 2 ? bannerGluing : bannerGluing * 2;
        } else if (currentMaterialType === 'vinyl') {
          addition = parts === 2 ? vinylGluing : vinylGluing * 2;
        }
      }

      const partWidth = width / parts + addition;
      if (partWidth <= size) {
        bestSolution = {
          parts,
          addition,
          partWidth
        };
        break;
      }
    }

    if (!bestSolution) return;

    const repeat = bestSolution.parts;
    const add = bestSolution.addition;

    let resultWidth, resultHeight;
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

//Вариант с делением на части узких длинных полос

// function formingResArr(
//   currentWidth, 
//   currentHeight, 
//   material, 
//   direction
// ) {
//   const wasteArr = [];
//   const currentMaterialType = material.type;
//   const currentSizeArr = material.size.map(Number); // на всякий случай к числам

//   const bannerGluing = 40;
//   const vinylGluing = 5;
  
//   let width = 0; 
//   let height = 0;
//   let key = 'wasteWidth';

//   if (direction === 'width') {
//     width = currentWidth;
//     height = currentHeight;
//   } else {
//     width = currentHeight;
//     height = currentWidth;
//     key = 'wasteHeight';
//   }

//   const minSize = Math.min(...currentSizeArr);
//   const maxSize = Math.max(...currentSizeArr);

//   // --- Вертикальный раскрой (исправлено) ---
//   // Логика: кладём части "вертикально" в минимальную ширину материала.
//   // Кол-во частей = сколько раз высота макета помещается в minSize.
//   // Швы НЕ учитываем.
//   if (width > maxSize && height < (minSize / 2 - 10)) {
//     const parts = Math.floor(minSize / height); // сколько помещается по высоте
//     if (parts >= 2) {
//       const wasteValue = minSize - parts * height;              // остаток по ширине материала
//       const partLength = width / parts;                          // длина печати одной полосы
//       const wasteArea = (wasteValue / 1000) * (partLength / 1000);

//       if (wasteValue >= 20) {
//         wasteArr.push({
//           size: minSize,
//           repeat: parts,
//           [key]: wasteValue.toFixed(2),
//           waste: wasteArea.toFixed(2),
//           vertical: true
//         });
//       }
//     }
//   }

//   // --- Обычный расчёт (как было) ---
//   currentSizeArr.forEach((size) => {
//     let minParts = Math.ceil(width / size);
//     let bestSolution = null;

//     for (let parts = minParts; parts <= minParts + 10; parts++) {
//       let addition = 0;
//       if (parts > 1) {
//         if (currentMaterialType === 'banner') {
//           addition = parts === 2 ? bannerGluing : bannerGluing * 2;
//         } else if (currentMaterialType === 'vinyl') {
//           addition = parts === 2 ? vinylGluing : vinylGluing * 2;
//         }
//       }

//       const partWidth = width / parts + addition;
//       if (partWidth <= size) {
//         bestSolution = { parts, addition, partWidth };
//         break;
//       }
//     }

//     if (!bestSolution) return;

//     const repeat = bestSolution.parts;
//     const add = bestSolution.addition;

//     let resultWidth, resultHeight;
//     if (repeat > 1) {
//       resultWidth = width / repeat + add;
//       resultHeight = height * repeat;
//     } else {
//       resultWidth = width;
//       resultHeight = height;
//     }

//     const wasteValue = size - resultWidth;
//     const wasteArea = (wasteValue / 1000) * (resultHeight / 1000);

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