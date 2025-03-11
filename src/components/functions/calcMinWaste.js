function calcMinWaste(widthArr, heightArr) {
  let minWasteObj = {};

  const minWidthWasteObject = widthArr.reduce((minItem, currentItem) => {
    return +currentItem.waste < +minItem.waste ? currentItem : minItem;
  });
  
  const minHeightWasteObject = heightArr.reduce((minItem, currentItem) => {
    return +currentItem.waste < +minItem.waste ? currentItem : minItem;
  });
  
  if (minWidthWasteObject.waste < minHeightWasteObject.waste) {
    minWasteObj = minWidthWasteObject;
  } else {
    minWasteObj = minHeightWasteObject;
  }
  
  return minWasteObj;
}

export default calcMinWaste;
