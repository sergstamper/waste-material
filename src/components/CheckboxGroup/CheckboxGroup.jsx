import PropTypes from "prop-types";

import RadioButton from "../RadioButton/RadioButton";
import Checkbox from "../Checkbox/Checkbox";

import './CheckboxGroup.css';

function OptionGroup({
  id,
  checkboxPrefix,
  label,
  size,
  activeGroup,
  onRadioChange,
  onCheckboxChange,
  checkboxState,
}) {
  const isActive = activeGroup === id;

  return (
    <div className="group">
      <div className="underside-size">{size} mm</div>
      
      <RadioButton
        id={id}
        name="option"
        value={id}
        checked={isActive}
        onChange={onRadioChange}
        label={label}
      />

      <div className="checkbox-flex">
        <Checkbox
          onChange={onCheckboxChange}
          id={`top-${checkboxPrefix}`}
          checked={checkboxState[`top-${checkboxPrefix}`] || false}
          disabled={!isActive}
          className="child-checkbox"
        />

        <div className="checkbox-center">
          <Checkbox
            onChange={onCheckboxChange}
            id={`left-${checkboxPrefix}`}
            checked={checkboxState[`left-${checkboxPrefix}`] || false}
            disabled={!isActive}
            className="child-checkbox"
          />
          <Checkbox
            onChange={onCheckboxChange}
            id={`center-${checkboxPrefix}`}
            checked={checkboxState[`center-${checkboxPrefix}`] || false}
            disabled={!isActive}
            className="master-checkbox"
          />
          <Checkbox
            onChange={onCheckboxChange}
            id={`right-${checkboxPrefix}`}
            checked={checkboxState[`right-${checkboxPrefix}`] || false}
            disabled={!isActive}
            className="child-checkbox"
          />
        </div>

        <Checkbox
          onChange={onCheckboxChange}
          id={`bottom-${checkboxPrefix}`}
          checked={checkboxState[`bottom-${checkboxPrefix}`] || false}
          disabled={!isActive}
          className="child-checkbox"
        />
      </div>
    </div>
  );
}

OptionGroup.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  checkboxPrefix: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  activeGroup: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onRadioChange: PropTypes.func,
  onCheckboxChange: PropTypes.func,
  checkboxState: PropTypes.object
};

export default OptionGroup;
