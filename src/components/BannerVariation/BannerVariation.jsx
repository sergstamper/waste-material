import PropTypes from 'prop-types';

import CheckboxGroup from '../CheckboxGroup/CheckboxGroup';

import './BannerVariation.css'

function BannerVariation({ 
  onCheckboxChange, 
  onRadioChange, 
  checkboxState, 
  activeGroup, 
  undersideSize,
  pocketSize
  // isBanner 
}) {
  // const appearance = isBanner ? 'container' : 'hidden';

  return (
    <div className="container">

      <CheckboxGroup 
        id="underside"
        checkboxPrefix="1"
        label="Подворот"
        size={undersideSize}
        activeGroup={activeGroup}
        onRadioChange={onRadioChange}
        onCheckboxChange={onCheckboxChange}
        checkboxState={checkboxState}
      />

      {/* <div className="group">
        <div className="underside-size">{undersideSize} mm</div>
        
        <RadioButton 
          id="underside"
          name="option"
          value="underside"
          checked={activeGroup === "underside"}
          onChange={onRadioChange}
          label="Подворот"
        />

        <div className="checkbox-flex">
          <Checkbox 
            onChange={onCheckboxChange} 
            id="top-1"
            checked={checkboxState["top-1"] || false}
            disabled={activeGroup !== "underside"}
            className="child-checkbox"
          />
          
          <div className='checkbox-center'>
            <Checkbox
              onChange={onCheckboxChange}
              id="left-1"
              checked={checkboxState["left-1"] || false}
              disabled={activeGroup !== "underside"}
              className="child-checkbox"
            />
            <Checkbox
              onChange={onCheckboxChange}
              id="center-1"
              checked={checkboxState["center-1"] || false}
              disabled={activeGroup !== "underside"}
              className="master-checkbox"
            />
            <Checkbox
              onChange={onCheckboxChange}
              id="right-1"
              checked={checkboxState["right-1"] || false}
              disabled={activeGroup !== "underside"}
              className="child-checkbox"
            />
          </div>

          <Checkbox
            onChange={onCheckboxChange}
            id="bottom-1"
            checked={checkboxState["bottom-1"] || false}
            disabled={activeGroup !== "underside"}
            className="child-checkbox"
          />
        </div>
      </div> */}

      <div className="divider"></div>

      <CheckboxGroup
        id="pockets"
        checkboxPrefix="2"
        label="Карманы"
        size={pocketSize}
        activeGroup={activeGroup}
        onRadioChange={onRadioChange}
        onCheckboxChange={onCheckboxChange}
        checkboxState={checkboxState}
      />

      {/* <div className="group">
        <div className="underside-size">{pocketSize} mm</div>
        
        <RadioButton
          id="pockets"
          name="option"
          value="pockets"
          checked={activeGroup === "pockets"}
          onChange={onRadioChange}
          label="Карманы"
        />

        <div className="checkbox-flex">
          <Checkbox
            onChange={onCheckboxChange}
            id="top-2"
            checked={checkboxState["top-2"] || false}
            disabled={activeGroup !== "pockets"}
            className="child-checkbox"
          />

          <div className="checkbox-center">
            <Checkbox
              onChange={onCheckboxChange}

              id="left-2"
              checked={checkboxState["left-2"] || false}
              disabled={activeGroup !== "pockets"}
              className="child-checkbox"
            />
            <Checkbox
              onChange={onCheckboxChange}

              id="center-2"
              checked={checkboxState["center-2"] || false}
              disabled={activeGroup !== "pockets"}
              className="master-checkbox"
            />
            <Checkbox
              onChange={onCheckboxChange}

              id="right-2"
              checked={checkboxState["right-2"] || false}
              disabled={activeGroup !== "pockets"}
              className="child-checkbox"
            />
          </div>
          
          <Checkbox
            onChange={onCheckboxChange}
            id="bottom-2"
            checked={checkboxState["bottom-2"] || false}
            disabled={activeGroup !== "pockets"}
            className="child-checkbox"
          />
        </div>
      </div> */}
      
    </div>
  );
}

BannerVariation.propTypes = {
  onCheckboxChange: PropTypes.func.isRequired,
  onRadioChange: PropTypes.func.isRequired,
  checkboxState: PropTypes.object.isRequired,
  activeGroup: PropTypes.string.isRequired,
  undersideSize: PropTypes.node,
  pocketSize: PropTypes.node,
  isBanner: PropTypes.bool
};

export default BannerVariation;
