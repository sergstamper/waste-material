function edgeValues(width, height, size) {
  const valuesArr = [];
  let widthSub = -1;
  let heightSub = -1;

  for (let i = 0; i < size.length; i++) {
    if (+size[i + 1] - +size[i] >= 400) {
      valuesArr.push(size[i] - 20);
    }
  }

  valuesArr.push(size[size.length - 1] - 20);

  console.log('Edge values: ', valuesArr);

  for (let i = 0; i < valuesArr.length; i++) {
    const widthVal = width - valuesArr[i];
    const heightVal = height - valuesArr[i];

    if (widthVal >= 0 && widthVal < 50) {
      widthSub = widthVal;
    }

    if (heightVal >= 0 && heightVal < 50) {
      heightSub = heightVal;
    }
  }
  
  if (widthSub !== -1 && heightSub !== -1) {
    if (widthSub > heightSub) {
      return heightSub;
    } else {
      return widthSub;
    }
  } else if (widthSub !== -1) {
    return widthSub;
  } else if (heightSub !== -1) {
    return heightSub;
  }

  return -1
}

export default edgeValues;