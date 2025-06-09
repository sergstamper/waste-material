import Options from '../Options/Options';
import Input from '../Input/Input';
import Display from '../Display/Display';

import './InputData.css';

function InputData({ materials, width, height, onOptionChange, onWidthChange, onHeightChange, sizes }) {
  return (
    <>
      <div className="input-data">
        <Options 
          materials={materials} 
          onChange={onOptionChange} />
        <Input 
          value={width} 
          id="width"
          onChange={onWidthChange} />
        <Input 
          value={height} 
          id="height"
          onChange={onHeightChange} />
      </div>
      <div className="material-properties">
        <Display sizes={sizes} />
      </div>
    </>
  )
}

export default InputData;