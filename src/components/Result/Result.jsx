import calcMinWaste from "../functions/calcMinWaste";

function Result({ result }) {
  const wasteWidthArr = result.wasteInWidth;
  const wasteHeightArr = result.wasteInHeight; 
  const message = 'Both are bigger than the canvas size';
  let waste = 0;

  console.log(wasteWidthArr);
  console.log(wasteHeightArr);
  
  function displayResult() {
    const solidWidthPart = wasteWidthArr.filter((element) => element.repeat === 1);
    const solidHeightPart = wasteHeightArr.filter((element) => element.repeat === 1);
    let widthIndex = 0;
    let heightIndex = 0;
    const minWasteObj = calcMinWaste(wasteWidthArr, wasteHeightArr);
    const minWaste = minWasteObj.waste;

    if (wasteWidthArr.length > 0 
      && wasteHeightArr.length > 0
      && solidWidthPart.length > 0
      || solidHeightPart.length > 0
    ) {
      if (solidWidthPart.length > 1 && +solidWidthPart[0].wasteWidth === 0) {
        widthIndex = 1;
      } 
      if (solidHeightPart.length > 1 && +solidHeightPart[0].wasteHeight === 0) {
        heightIndex = 1;
      }

      if (solidWidthPart.length > 0 && solidHeightPart.length > 0) {
        if (solidWidthPart[widthIndex].waste < solidHeightPart[heightIndex].waste
          && solidWidthPart[widthIndex].waste >= 20
          || solidHeightPart[heightIndex].waste >= 20
        ) {
          waste = solidWidthPart[widthIndex].waste;
        } else {
          waste = solidHeightPart[heightIndex].waste;
        }
      } else if (solidWidthPart.length > 0) {
        waste = solidWidthPart[widthIndex].waste;
      } else if (solidHeightPart.length > 0) {
        waste = solidHeightPart[heightIndex].waste;
      } else {
        waste = Math.min(...wasteWidthArr.map((item) => item.waste));
      }
    } else if (wasteWidthArr.length > 0 && wasteHeightArr.length > 0) {
      waste = minWaste;

    } else {
      waste = 0;
    }

    return waste;
  }

  const resultArr = displayResult();

  return (
    <div className="result">
      <h2>Result</h2>
      <p>{waste}</p>
    </div>
  );
}

export default Result;