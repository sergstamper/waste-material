function Result({ result, width, height }) {
  const {wasteInWidth, wasteInHeight} = result;
console.log(wasteInWidth, wasteInHeight);
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