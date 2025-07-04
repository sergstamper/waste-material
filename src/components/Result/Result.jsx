import Message from "../Message/Message";
import ResButtons from "../ResButtons/ResButtons";

import "./Result.css";

function Result({ result, done, onClick, name, id, btnClass }) {
  return (
    <>
      {done ? 
        <div className="result">
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
    </>
  );
}

export default Result;