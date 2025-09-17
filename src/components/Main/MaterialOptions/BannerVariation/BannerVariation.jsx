import PropTypes from 'prop-types';

import CheckboxGroup from './CheckboxGroup/CheckboxGroup';

import './BannerVariation.css'

function BannerVariation({ 
  onCheckboxChange, 
  onRadioChange, 
  checkboxState, 
  activeGroup, 
  undersideSize,
  pocketSize
}) {
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
