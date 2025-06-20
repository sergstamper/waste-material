import Options from '../Options/Options';
import Input from '../Input/Input';
import Display from '../Display/Display';

import './InputData.css';

import PropTypes from 'prop-types';

function InputData({ 
    materials, 
    width, 
    height, 
    onOptionChange, 
    onWidthChange, 
    onHeightChange, 
    sizes 
  }) {
  return (
    <>
      <div className="materials">
        <div className="input-data">
          <Options 
            materials={materials} 
            onChange={onOptionChange} />
            <div className="inputs">
              <Input 
                value={width} 
                id="width"
                label="Ширина"
                onChange={onWidthChange} />
              <Input 
                value={height} 
                id="height"
                label="Высота"
                onChange={onHeightChange} />
            </div>
        </div>
        <div className="material-properties">
          <Display sizes={sizes} />
        </div>
      </div>
    </>
  )
}

InputData.propTypes = {
  materials: PropTypes.array.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onOptionChange: PropTypes.func.isRequired,
  onWidthChange: PropTypes.func.isRequired,
  onHeightChange: PropTypes.func.isRequired,
  sizes: PropTypes.array
};

export default InputData;