import { useState, useEffect } from 'react'
import './App.css'

import InputData from './components/InputData/InputData';
import MaterialOptions from './components/MaterialOptions/MaterialOptions';
import ButtonsBlock from './components/ButtonsBlock/ButtonsBlock';
import Result from './components/Result/Result';

import canvasChoise from './components/functions/canvasChoise';
import calcDimensions from './components/functions/calcDimensions';
import calcWaste from './components/functions/calcWaste';
import makeResult from './components/functions/makeResult';
import resultMsg from './components/functions/resultMsg';
import edgeValues from './components/functions/edgeValues';
import filterMaterial from './components/functions/filterMaterial';

function App() {
  const [materials, setMaterials] = useState([]);
  const [currentMaterial, setCurrentMaterial] = useState([]);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [trueWidth, setTrueWidth] = useState('');
  const [trueHeight, setTrueHeight] = useState('');
  const [result, setResult] = useState({});
  const [done, setDone] = useState(false);
  const [checkboxState, setCheckboxState] = useState({});
  const [activeGroup, setActiveGroup] = useState('underside');
  const [canvasOption, setCanvasOption] = useState('zero');

  const [isBanner, setIsBanner] = useState(false);
  const [isCanvas, setIsCanvas] = useState(false);
  const [isStandardChecked, setIsStandardChecked] = useState(false);
  const [is1440Checked, setIs1440Checked] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const initialCheckboxState = {
    'top-1': false,
    'left-1': false,
    'center-1': false,
    'right-1': false,
    'bottom-1': false,
    'top-2': false,
    'left-2': false,
    'center-2': false,
    'right-2': false,
    'bottom-2': false,
  };

  useEffect(() => {
    setCheckboxState(initialCheckboxState);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetch('./materials.json')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        setMaterials(data);
        setCurrentMaterial(data[0]);
        checkMaterial(data[0].type);
        setDone(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReset]);

  function handleSizeChange(event) {
    const { value, id } = event.target;
    const regExp = /^$|^(0|[1-9]\d*)$/;
    
    if (value !== '' && !regExp.test(value)) return;

    if (id === 'width') {
      setWidth(value);
      setTrueWidth(value);
    } else if (id === 'height') {
      setHeight(value);
      setTrueHeight(value);
    }
  }

  function handleOptionsChange(event) {
    const materialValue = event.target.value;
    setCheckboxState(initialCheckboxState);
    materials.forEach((material) => {
      if (material.name === materialValue) {
        setCurrentMaterial(material);
        checkMaterial(material.type);
      }

      if (material.type !== 'banner' && trueWidth && trueHeight) {
        setTrueWidth(width);
        setTrueHeight(height);
      }
    });
  }

  function checkMaterial(type) {
    if (type === 'banner') {
      setCheckboxState(initialCheckboxState);
      setIsBanner(true);
      setIsCanvas(false);
    } else if (type === 'canvas') {
      setCheckboxState(initialCheckboxState);
      setIsBanner(false);
      setIsCanvas(true);
    } else {
      setCheckboxState(initialCheckboxState);
      setIsBanner(false);
      setIsCanvas(false);
    }
  };

  const handleRadioChange = (event) => {
    const newGroup = event.target.value;
    setActiveGroup(newGroup);
    setCheckboxState(initialCheckboxState);
    setTrueWidth(width);
    setTrueHeight(height);
  };

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    const groupSuffix = activeGroup === 'underside' ? '-1' : '-2';

    setCheckboxState((prevState) => {
      const updatedState = { ...prevState };

      if (id.includes('center')) {
        for (const key in updatedState) {
          if (key.endsWith(groupSuffix)) {
            updatedState[key] = checked;
          }
        }
      } else {
        updatedState[id] = checked;

        const allChecked = Object.keys(updatedState).every((key) => {
          if (key.endsWith(groupSuffix) && !key.includes('center')) {
            return updatedState[key];
          }
          return true;
        });

        updatedState[`center${groupSuffix}`] = allChecked;
      }

      updateDimensions(updatedState);

      return updatedState;
    });
  };

  function handleCheckbox1440Change(event) {
    const { checked } = event.target;
    setIs1440Checked(checked);
  }

  function updateDimensions(checkboxState) {
    let { tempWidth, tempHeight } = calcDimensions(checkboxState, width, height);

    setTrueWidth(tempWidth.toString());
    setTrueHeight(tempHeight.toString());
  };

  function handleCanvasChoise(value, isStandardChecked) {
    const { canvWidth, canvHeight } = canvasChoise(value, width, height, isStandardChecked);
    setTrueWidth(canvWidth);
    setTrueHeight(canvHeight);
  }

  const handleCanvasOptionChange = (event) => {
    const value = event.target.value;
    setCanvasOption(value);
    handleCanvasChoise(value, isStandardChecked);
  };

  const handleStandardCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsStandardChecked(isChecked);
    handleCanvasChoise(canvasOption, isChecked);
  };

  function calculate() {
    if (width !== '' && height !== '') {
      const currentFilteredMaterial = filterMaterial(currentMaterial, is1440Checked)

      const {
        filteredWasteInWidthArr, 
        filteredWasteInHeightArr
      } = calcWaste(trueWidth, trueHeight, currentFilteredMaterial);

      const resultObj = makeResult(filteredWasteInWidthArr, filteredWasteInHeightArr);

      const edgeValue = edgeValues(width, height, currentFilteredMaterial.size);
      
      console.log(edgeValue);

      const resMsg = resultMsg(resultObj, checkboxState, edgeValue, isCanvas);
      setResult(resMsg);

      setDone(true);
    } else {
      setDone(false);
      setResult({});
    }
  }

  function reset() {
    setIsReset(!isReset)
    // setCurrentMaterial(materials[0]);
    // setWidth('');
    // setHeight('');
    // setTrueWidth('');
    // setTrueHeight('');
    // setCheckboxState(initialCheckboxState);
    // setResult({});
    // setDone(false);
    // checkMaterial();

    
    // setActiveGroup('underside');
    // setCanvasOption('zero');
    // setIsBanner(false);
    // setIsCanvas(false);
    // setIsStandardChecked(false);
    // setIs1440Checked(false);
  }

  return (
    <>
      <InputData 
        materials={materials} 
        currentMaterial={currentMaterial}
        width={width} 
        height={height} 
        sizes={currentMaterial.size}
        onOptionChange={(event) => handleOptionsChange(event)} 
        onWidthChange={(event) => handleSizeChange(event)}
        onHeightChange={(event) => handleSizeChange(event)}
      />

      <MaterialOptions
        isBanner={isBanner}
        isCanvas={isCanvas}
        keyGroup={activeGroup}
        checkboxState={checkboxState}
        activeGroup={activeGroup}
        onCheckboxChange={handleCheckboxChange}
        onRadioChange={handleRadioChange}
        onCanvasCheckboxChange={handleCanvasOptionChange} 
        isStandard={isStandardChecked} 
        onStandardChange={handleStandardCheckboxChange} 
        onCheckbox1440Change={handleCheckbox1440Change}
        checkbox1440State={checkboxState['checkbox-1440']}
      />

      <ButtonsBlock
        onReset={() => reset()}
        onCalculate={() => calculate()}
      />

      <Result result={result} done={done} />
    </>
  )
}

export default App;
