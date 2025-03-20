// import calcMinWaste from "../functions/calcMinWaste";

function Result({ result, done }) {
  const { waste, minWaste, parts, materialSize } = result;
  // const wasteWidthArr = result.wasteInWidth;
  // const wasteHeightArr = result.wasteInHeight; 
  // let waste = 0;
  // let parts = 0;
  // let materialSize = 0;
  // let minWaste = 0;

  // console.log(wasteWidthArr);
  // console.log(wasteHeightArr);
  // console.log(result);
  
  // function displayResult() {
  //   const solidWidthPart = wasteWidthArr.filter((element) => element.repeat === 1);
  //   const solidHeightPart = wasteHeightArr.filter((element) => element.repeat === 1);
  //   let widthIndex = 0;
  //   let heightIndex = 0;

  //   const minWasteObj = calcMinWaste(wasteWidthArr, wasteHeightArr);
  //   minWaste = minWasteObj.waste;
  //   parts = minWasteObj.repeat;
  //   materialSize = minWasteObj.size;

  //   if (wasteWidthArr.length > 0 
  //     && wasteHeightArr.length > 0
  //     && solidWidthPart.length > 0
  //     || solidHeightPart.length > 0
  //   ) {
  //     if (solidWidthPart.length > 1 && +solidWidthPart[0].wasteWidth < 20) {
  //       widthIndex = 1;
  //     } 
  //     if (solidHeightPart.length > 1 && +solidHeightPart[0].wasteHeight < 20) {
  //       heightIndex = 1;
  //     }

  //     if (solidWidthPart.length > 0 && solidHeightPart.length > 0) {
  //       if (solidWidthPart[widthIndex].waste < solidHeightPart[heightIndex].waste
  //         && solidWidthPart[widthIndex].waste >= 20
  //         || solidHeightPart[heightIndex].waste >= 20
  //       ) {
  //         waste = solidWidthPart[widthIndex].waste;
  //       } else {
  //         waste = solidHeightPart[heightIndex].waste;
  //       }
  //     } else if (solidWidthPart.length > 0) {
  //       waste = solidWidthPart[widthIndex].waste;
  //     } else if (solidHeightPart.length > 0) {
  //       waste = solidHeightPart[heightIndex].waste;
  //     } 
  //   } else if (wasteWidthArr.length > 0 && wasteHeightArr.length > 0) {
  //     waste = minWaste;

  //   } else {
  //     waste = 0;
  //   }

  //   return waste;
  // }

  // if (wasteWidthArr.length > 0 && wasteHeightArr.length > 0) {
  //   displayResult();
  // }

  return (
    <div className="result">
      <h2>Result</h2>
      <p>Waste: {waste}</p>
      {done ? 
      <p>Minimal waste: <b>{minWaste}</b> from <b>{parts}</b> parts on material width <b>{materialSize}</b></p>
      : null
      }
      </div>
  );
}

export default Result;