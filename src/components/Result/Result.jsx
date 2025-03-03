function Result({ result }) {
  const wasteWidthArr = result.wasteInWidth;
  const wasteHeightArr = result.wasteInHeight; 
  const message = 'Both are bigger than the canvas size';
  let waste = 0;

  function displayResult() {
    const solidWidthPart = wasteWidthArr.filter((element) => element.repeat === 1);
    const solidHeightPart = wasteHeightArr.filter((element) => element.repeat === 1);

    // const solidWidthPartWaste = solidWidthPart[0].waste;
    // const solidHeightPartWaste = solidHeightPart[0].waste;

    if (solidWidthPart.length > 0 && solidHeightPart.length > 0) {
      if (solidWidthPart[0].waste < solidHeightPart[0].waste) {
        waste = solidWidthPart[0].waste;
      } else {
        waste = solidHeightPart[0].waste;
      }
    } else if (solidWidthPart.length > 0) {
      waste = solidWidthPart[0].waste;
    } else if (solidHeightPart.length > 0) {
      waste = solidHeightPart[0].waste;
    } else {
      waste = message;
    }
    // console.log(solidHeightPart.waste);
    return waste;
  }

  const resultArr = displayResult();
  
  console.log(resultArr);
  
  return (
    <div className="result">
      {/* <h2>Result</h2>
      <p>{result} m</p>
      <p>{width}</p>
      <p>{height}</p> */}
    </div>
  );
}

export default Result;