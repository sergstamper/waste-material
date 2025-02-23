function filterMinWaste(data, wasteProperty) {
  const groupedByRepeat = {};

  // Группируем объекты по значению repeat
  data.forEach(item => {
    if (!groupedByRepeat[item.repeat]) {
      groupedByRepeat[item.repeat] = [];
    }
    groupedByRepeat[item.repeat].push(item);
  });

  // Сортируем группы по repeat
  const sortedGroups = Object.values(groupedByRepeat).sort((a, b) => a[0].repeat - b[0].repeat);

  // Для каждой группы находим объект с минимальным waste и, если есть, объект с wasteProperty >= 0.02
  const result = sortedGroups.flatMap(group => {
    // Находим объект с минимальным waste
    const minWasteItem = group.reduce((minItem, currentItem) => {
      return (+currentItem.waste < +minItem.waste) ? currentItem : minItem;
    });

    // Проверяем, есть ли в группе объект с wasteProperty = 0
    const hasZeroWaste = group.some(item => +item[wasteProperty] < 20);

    // Если есть объект с wasteProperty = 0, ищем объект с минимальным waste >= 0.02
    let additionalItem = null;
    if (hasZeroWaste) {
      const candidates = group.filter(item => +item[wasteProperty] >= 20); // Отфильтровываем объекты с wasteProperty >= 0.02
      if (candidates.length > 0) {
        additionalItem = candidates.reduce((minItem, currentItem) => {
          return (+currentItem.waste < +minItem.waste) ? currentItem : minItem;
        });
      }
    }

    // Формируем результат
    const resultItems = [minWasteItem];
    if (additionalItem) {
      resultItems.push(additionalItem);
    }

    return resultItems;
  });

  return result;
}

export default filterMinWaste;
