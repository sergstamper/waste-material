function edgeValues(width, height, size) {
  const valuesArr = [];
  let widthSub;
  let heightSub;

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

    console.log('widthVal: ', widthVal);
    console.log('heightVal: ', heightVal);

    if (widthVal > -80 && widthVal <= 50) {
      widthSub = widthVal;
    }

    if (heightVal > -80 && heightVal <= 50) {
      heightSub = heightVal;
    }
  }
  console.log('--heightSub: ', heightSub);
  console.log('--widthSub: ', widthSub);
  
  if (widthSub !== undefined && heightSub !== undefined) {
    if (widthSub > heightSub) {
      return heightSub;
    } else {
      return widthSub;
    }
  } else if (widthSub !== undefined) {
    return widthSub;
  } else if (heightSub !== undefined) {
    return heightSub;
  }

  // return 100;
}

export default edgeValues;