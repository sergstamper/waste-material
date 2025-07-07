import './BannerVariation.css'
import PropTypes from 'prop-types';

function BannerVariation({ onCheckboxChange, onRadioChange, checkboxState, activeGroup, isBanner }) {
  // const appearance = isBanner ? 'container' : 'hidden';

  return (
    <div className="container">
      <div className="group">
          <input 
            type="radio" 
            name="option" 
            value="underside" 
            checked={activeGroup === "underside"}
            onChange={onRadioChange} 
            id="underside"
          />
        <label htmlFor="underside">Подворот</label>
        <div className="checkbox-flex">
          <input 
            onChange={onCheckboxChange} 
            type="checkbox" 
            id="top-1" 
            checked={checkboxState["top-1"] || false}
            disabled={activeGroup !== "underside"}
            className="child-checkbox" 
          />
          <div className='checkbox-center'>
          <input
              onChange={onCheckboxChange}
              type="checkbox"
              id="left-1"
              checked={checkboxState["left-1"] || false}
              disabled={activeGroup !== "underside"}
              className="child-checkbox"
            />
            <input
              onChange={onCheckboxChange}
              type="checkbox"
              id="center-1"
              checked={checkboxState["center-1"] || false}
              disabled={activeGroup !== "underside"}
              className="master-checkbox"
            />
            <input
              onChange={onCheckboxChange}
              type="checkbox"
              id="right-1"
              checked={checkboxState["right-1"] || false}
              disabled={activeGroup !== "underside"}
              className="child-checkbox"
            />
          </div>
            <input
              onChange={onCheckboxChange}
              type="checkbox"
              id="bottom-1"
              checked={checkboxState["bottom-1"] || false}
              disabled={activeGroup !== "underside"}
              className="child-checkbox"
            />
        </div>
      </div>

      <div className="divider"></div>

      <div className="group">
          <input
            type="radio"
            name="option"
            value="pockets"
            checked={activeGroup === "pockets"}
            onChange={onRadioChange}
            id="pockets"
          />
        <label htmlFor="pockets">Карманы</label>
        <div className="checkbox-flex">
          <input
            onChange={onCheckboxChange}
            type="checkbox"
            id="top-2"
            checked={checkboxState["top-2"] || false}
            disabled={activeGroup !== "pockets"}
            className="child-checkbox"
          />
          <div className="checkbox-center">
            <input
              onChange={onCheckboxChange}
              type="checkbox"
              id="left-2"
              checked={checkboxState["left-2"] || false}
              disabled={activeGroup !== "pockets"}
              className="child-checkbox"
            />
            <input
              onChange={onCheckboxChange}
              type="checkbox"
              id="center-2"
              checked={checkboxState["center-2"] || false}
              disabled={activeGroup !== "pockets"}
              className="master-checkbox"
            />
            <input
              onChange={onCheckboxChange}
              type="checkbox"
              id="right-2"
              checked={checkboxState["right-2"] || false}
              disabled={activeGroup !== "pockets"}
              className="child-checkbox"
            />
          </div>
          <input
            onChange={onCheckboxChange}
            type="checkbox"
            id="bottom-2"
            checked={checkboxState["bottom-2"] || false}
            disabled={activeGroup !== "pockets"}
            className="child-checkbox"
          />
        </div>
      </div>
      
    </div>
  );
}

BannerVariation.propTypes = {
  onCheckboxChange: PropTypes.func.isRequired,
  onRadioChange: PropTypes.func.isRequired,
  checkboxState: PropTypes.object.isRequired,
  activeGroup: PropTypes.string.isRequired,
  isBanner: PropTypes.bool
};

export default BannerVariation;
