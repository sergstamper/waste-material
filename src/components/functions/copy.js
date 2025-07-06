function copy(props) {
  const { 
      currentMaterial, 
      width, 
      height, 
      result, 
      isBanner, 
      isCanvas, 
      checkboxState, 
      is1440Checked, 
      canvasOption 
  } = props;
  console.log(result);
  let additionText = '.';
  const add1440Text = is1440Checked ? 'Печать: 1440 dpi.' : '';

  if (isBanner && checkboxState['center-1']) {
    additionText = ` с подворотом.`;
  } else if (isBanner && checkboxState['center-2']) {
    additionText = ` с карманом.`;
  } else if (isCanvas) {
    additionText = ` на рамке ${canvasOption} мм.`;
  }

  const copyText = [
    `Материал: ${currentMaterial.description}.`,
    `Размеры: ${width}×${height} мм${additionText}`,
    add1440Text,
    result.wasteMsg,
    result.minWasteMsg,
    result.tip
  ].filter(Boolean).join('\n').replace(/^[ \t]+/gm, '').trim();

  navigator.clipboard.writeText(copyText)
    .then(() => {
      console.log('Текст скопирован в буфер обмена', copyText);
    })
    .catch((error) => {
      console.error('Ошибка при копировании текста:', error);
    });
}

export default copy;
