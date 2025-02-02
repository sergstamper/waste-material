import './Variation.css'

function Variation({ onCheckboxChange, onRadioChange, checkboxState, activeGroup }) {
  return (
    <div className="container">
      <div className="group">
        <label>
          <input 
            type="radio" 
            name="option" 
            value="Подворот" 
            checked={activeGroup === "Подворот"}
            onChange={onRadioChange} 
          />
          Подворот
        </label>
        <div className="checkbox-flex">
          <input 
            onChange={onCheckboxChange} 
            type="checkbox" 
            id="top-1" 
            checked={checkboxState["top-1"] || false}
            disabled={activeGroup !== "Подворот"}
            className="child-checkbox" 
          />
          <div className='checkbox-center'>
          <input
              onChange={onCheckboxChange}
              type="checkbox"
              id="left-1"
              checked={checkboxState["left-1"] || false}
              disabled={activeGroup !== "Подворот"}
              className="child-checkbox"
            />
            <input
              onChange={onCheckboxChange}
              type="checkbox"
              id="center-1"
              checked={checkboxState["center-1"] || false}
              disabled={activeGroup !== "Подворот"}
              className="master-checkbox"
            />
            <input
              onChange={onCheckboxChange}
              type="checkbox"
              id="right-1"
              checked={checkboxState["right-1"] || false}
              disabled={activeGroup !== "Подворот"}
              className="child-checkbox"
            />
          </div>
            <input
              onChange={onCheckboxChange}
              type="checkbox"
              id="bottom-1"
              checked={checkboxState["bottom-1"] || false}
              disabled={activeGroup !== "Подворот"}
              className="child-checkbox"
            />
        </div>
      </div>

      <div className="divider"></div>

      <div className="group">
        <label>
          <input
            type="radio"
            name="option"
            value="Карманы"
            checked={activeGroup === "Карманы"}
            onChange={onRadioChange}
          />
          Карманы
        </label>
        <div className="checkbox-flex">
          <input
            onChange={onCheckboxChange}
            type="checkbox"
            id="top-2"
            checked={checkboxState["top-2"] || false}
            disabled={activeGroup !== "Карманы"}
            className="child-checkbox"
          />
          <div className="checkbox-center">
            <input
              onChange={onCheckboxChange}
              type="checkbox"
              id="left-2"
              checked={checkboxState["left-2"] || false}
              disabled={activeGroup !== "Карманы"}
              className="child-checkbox"
            />
            <input
              onChange={onCheckboxChange}
              type="checkbox"
              id="center-2"
              checked={checkboxState["center-2"] || false}
              disabled={activeGroup !== "Карманы"}
              className="master-checkbox"
            />
            <input
              onChange={onCheckboxChange}
              type="checkbox"
              id="right-2"
              checked={checkboxState["right-2"] || false}
              disabled={activeGroup !== "Карманы"}
              className="child-checkbox"
            />
          </div>
          <input
            onChange={onCheckboxChange}
            type="checkbox"
            id="bottom-2"
            checked={checkboxState["bottom-2"] || false}
            disabled={activeGroup !== "Карманы"}
            className="child-checkbox"
          />
        </div>
      </div>
    </div>
  );
}

export default Variation;