function filterMinWaste(data, wasteProperty) {
  const groupedByRepeat = {};

  // const cleanData = data.filter(item => +item[wasteProperty] >= 20);

  data.forEach(item => {
    if (!groupedByRepeat[item.repeat]) {
      groupedByRepeat[item.repeat] = [];
    }
    groupedByRepeat[item.repeat].push(item);
  });

  // console.log('Grouped by repeat: ', groupedByRepeat);

  const sortedGroups = Object.values(groupedByRepeat).sort((a, b) => a[0].repeat - b[0].repeat);

  // console.log('Sorted groups: ', sortedGroups);

  const result = sortedGroups.flatMap(group => {
    const minWasteItem = group.reduce((minItem, currentItem) => {
      return (+currentItem.waste < +minItem.waste) ? currentItem : minItem;
    });

    // console.log('Min Waste Item: ', minWasteItem);

    // const hasZeroWaste = group.some(item => +item[wasteProperty] < 20); //adding zero waste item?
    
    // let additionalItem = null;
    // if (hasZeroWaste) {
    //   const candidates = group.filter(item => +item[wasteProperty] >= 20);
    //   if (candidates.length > 0) {
    //     additionalItem = candidates.reduce((minItem, currentItem) => {
    //       return (+currentItem.waste < +minItem.waste) ? currentItem : minItem;
    //     });
    //   }
    // }

    
    const resultItems = [minWasteItem];
    // if (additionalItem) {
    //   resultItems.push(additionalItem);
    // }
    
    return resultItems;
  });

  // console.log('Result: ', result);

  return result;
}

export default filterMinWaste;
