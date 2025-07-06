import Message from "../Message/Message";
import ResButtons from "../ResButtons/ResButtons";

import "./Result.css";
import PropTypes from "prop-types";

function Result({ result, done, onVariantClick, onCopy, name, id, btnClass }) {
  return (
    <>
      {done ? 
        <div className="result">
          <Message 
            result={result}
          />
          <ResButtons 
            onVariantClick={onVariantClick}
            onCopy={onCopy}
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

Result.propTypes = {
  result: PropTypes.any,
  done: PropTypes.bool,
  onVariantClick: PropTypes.func,
  onCopy: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.any,
  btnClass: PropTypes.string
};

export default Result;
