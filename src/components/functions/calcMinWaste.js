function calcMinWaste(widthArr, heightArr) {
  let minWasteObj = {};
  const filteredWidthArr = widthArr.filter((element) => element.wasteWidth >= 20);
  const filteredHeightArr = heightArr.filter((element) => element.wasteHeight >= 20);

  console.log('From minWaste: ', filteredWidthArr);
  console.log('From minWaste: ', filteredHeightArr);

  const minWidthWasteObject = filteredWidthArr.reduce((minItem, currentItem) => {
    return +currentItem.waste < +minItem.waste ? currentItem : minItem;
  });
  
  const minHeightWasteObject = filteredHeightArr.reduce((minItem, currentItem) => {
    return +currentItem.waste < +minItem.waste ? currentItem : minItem;
  });
  
  if (minWidthWasteObject.waste < minHeightWasteObject.waste) {
    minWasteObj = minWidthWasteObject;
  } else {
    minWasteObj = minHeightWasteObject;
  }
  console.log('From minWaste: ', minWasteObj);
  return minWasteObj;
}

export default calcMinWaste;
