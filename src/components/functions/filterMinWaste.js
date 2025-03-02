function filterMinWaste(data, wasteProperty) {
  const groupedByRepeat = {};

  data.forEach(item => {
    if (!groupedByRepeat[item.repeat]) {
      groupedByRepeat[item.repeat] = [];
    }
    groupedByRepeat[item.repeat].push(item);
  });

  const sortedGroups = Object.values(groupedByRepeat).sort((a, b) => a[0].repeat - b[0].repeat);

  const result = sortedGroups.flatMap(group => {
    const minWasteItem = group.reduce((minItem, currentItem) => {
      return (+currentItem.waste < +minItem.waste) ? currentItem : minItem;
    });

    const hasZeroWaste = group.some(item => +item[wasteProperty] < 20);

    let additionalItem = null;
    if (hasZeroWaste) {
      const candidates = group.filter(item => +item[wasteProperty] >= 20);
      if (candidates.length > 0) {
        additionalItem = candidates.reduce((minItem, currentItem) => {
          return (+currentItem.waste < +minItem.waste) ? currentItem : minItem;
        });
      }
    }

    const resultItems = [minWasteItem];
    if (additionalItem) {
      resultItems.push(additionalItem);
    }

    return resultItems;
  });

  return result;
}

export default filterMinWaste;
