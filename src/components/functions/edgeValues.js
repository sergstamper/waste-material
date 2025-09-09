function edgeValues(width, height, size, undersideSize) {
  const valuesArr = [];
  let widthSub;
  let heightSub;

  const underside = undersideSize ? -(parseFloat(undersideSize)*2) : 0;

  for (let i = 0; i < size.length; i++) {
    if (+size[i + 1] - +size[i] >= 400) { // Check if the gap between sizes is 400 or more
      valuesArr.push(size[i] - 20);
    }
  }

  valuesArr.push(size[size.length - 1] - 20); // Push the last material size minus 20

  console.log('Edge values: ', valuesArr);

  for (let i = 0; i < valuesArr.length; i++) {
    const widthVal = width - valuesArr[i]; // Calculate width - edge value
    const heightVal = height - valuesArr[i];

    console.log('widthVal: ', widthVal);
    console.log('heightVal: ', heightVal);

    if (widthVal > underside && widthVal <= 50) { // Check if widthVal is within the desired range
      widthSub = widthVal; // Value that will be subtracted from width
    }

    if (heightVal > underside && heightVal <= 50) {
      heightSub = heightVal; // Value that will be subtracted from height
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