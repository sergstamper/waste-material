function Result({ result, done }) {
  const { wasteMsg, minWasteMsg, tip } = result;

  return (
    <div className="result">
      <h2>Result</h2>
      <p>Отход: {wasteMsg || 0}</p>
      {done ? 
        <div>
          <p>{minWasteMsg}</p>
          <p>{tip || null}</p>
        </div>
        : null
      }
    </div>
  );
}

export default Result;