import Message from "../Message/Message";
import ResButtons from "../ResButtons/ResButtons";

function Result({ result, done, onClick, name, id, btnClass }) {
  return (
    <div className="result">
      <p>{result.wasteMsg || ''}</p>
      {done ? 
        <div>
          <Message 
            done={done}
            result={result}
          />
          <ResButtons 
            onClick={onClick}
            name={name}
            id={id}
            className={btnClass}
          />
        </div>
        : null
      }
    </div>
  );
}

export default Result;