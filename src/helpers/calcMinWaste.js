function calcMinWaste(widthArr) {
  let minWasteObj = {};
  const filteredWidthArr = widthArr.filter((element) => element.wasteWidth >= 20);
  // const filteredHeightArr = heightArr.filter((element) => element.wasteHeight >= 20);

  const minWidthWasteObject = filteredWidthArr.reduce((minItem, currentItem) => {
    if (+currentItem.waste < +minItem.waste && +currentItem.waste <= 1 && +minItem.waste <= 1) {
        return +currentItem.repeat <= +minItem.repeat ? currentItem : minItem;
      } else if (+currentItem.waste < +minItem.waste) {
        return currentItem;
      } else {
        return minItem;
      }
  });
  
  // const minHeightWasteObject = filteredHeightArr.reduce((minItem, currentItem) => {
  //   if (+currentItem.waste < +minItem.waste && +currentItem.waste <= 1 && +minItem.waste <= 1) {
  //     return +currentItem.repeat <= +minItem.repeat ? currentItem : minItem;
  //   } else if (+currentItem.waste < +minItem.waste) {
  //     return currentItem;
  //   } else {
  //     return minItem;
  //   }
  // });

  minWasteObj = minWidthWasteObject;
  
  return minWasteObj;
}

export default calcMinWaste;
