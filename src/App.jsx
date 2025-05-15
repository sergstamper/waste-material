import { useState, useEffect } from 'react'
import './App.css'

import Options from './components/Options/Options';
import Input from './components/Input/Input';
import Display from './components/Display/Display';
import BannerVariation from './components/BannerVariation/BannerVariation';
import Recommendation from './components/Recommendation/Recommendation';
import Button from './components/Button/Button';
import Result from './components/Result/Result';
import CanvasVariation from './components/CanvasVariation/CanvasVariation';
import canvasChoise from './components/functions/canvasChoise';
import calcDimensions from './components/functions/calcDimensions';
import calcWaste from './components/functions/calcWaste';
import makeResult from './components/functions/makeResult';
import resultMsg from './components/functions/resultMsg';

function App() {
  const [materials, setMaterials] = useState([]);
  const [currentMaterial, setCurrentMaterial] = useState([]);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [trueWidth, setTrueWidth] = useState("");
  const [trueHeight, setTrueHeight] = useState("");
  const [result, setResult] = useState({});
  const [done, setDone] = useState(false);
  // const [result, setResult] = useState({ wasteInWidth: [], wasteInHeight: [] });
  const [checkboxState, setCheckboxState] = useState({});
  const [activeGroup, setActiveGroup] = useState('underside');
  const [canvasOption, setCanvasOption] = useState('zero');

  const [isBanner, setIsBanner] = useState(false);
  const [isCanvas, setIsCanvas] = useState(false);
  const [isStandardChecked, setIsStandardChecked] = useState(false);

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
  }, []);

  function handleOptionsChange(event) {
    const materialValue = event.target.value;
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
      setIsBanner(true);
      setCheckboxState(initialCheckboxState);
      setIsCanvas(false);
    } else if (type === 'canvas') {
      setIsBanner(false);
      setIsCanvas(true);
    } else{
      setIsBanner(false);
      setIsCanvas(false);
    }
  };

  const handleRadioChange = (event) => {
    const newGroup = event.target.value;
    setActiveGroup(newGroup);
    setCheckboxState(initialCheckboxState) //!!
    setTrueWidth(width); //!!
    setTrueHeight(height); //!!
  };

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    const groupSuffix = activeGroup === 'underside' ? '-1' : '-2';

    setCheckboxState((prevState) => {
      const updatedState = { ...prevState };

      if (id.includes('center')) {
        // Если изменяется центральный чекбокс, обновляем все чекбоксы в группе
        for (const key in updatedState) {
          if (key.endsWith(groupSuffix)) {
            updatedState[key] = checked;
          }
        }
      } else {
        // Если изменяется ведомый чекбокс, обновляем его состояние
        updatedState[id] = checked;

        // Проверяем, все ли ведомые чекбоксы активны
        const allChecked = Object.keys(updatedState).every((key) => {
          if (key.endsWith(groupSuffix) && !key.includes('center')) {
            return updatedState[key];
          }
          return true;
        });

        // Обновляем состояние центрального чекбокса
        updatedState[`center${groupSuffix}`] = allChecked;
      }

      updateDimensions(updatedState);

      return updatedState;
    });
  };

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

  function edgeValues(width, height, size) {
    const valuesArr = [];
    let widthSub = -1;
    let heightSub = -1;

    for (let i = 0; i < size.length; i++) {
      if (+size[i + 1] - +size[i] >= 400) {
        valuesArr.push(size[i] - 20);
      }
    }

    valuesArr.push(size[size.length - 1] - 20);

    console.log('Edge values: ', valuesArr);

    for (let i = 0; i < valuesArr.length; i++) {
      const widthVal = width - valuesArr[i];
      const heightVal = height - valuesArr[i];

      if (widthVal >= 0 && widthVal < 50) {
        widthSub = widthVal;
      }

      if (heightVal >= 0 && heightVal < 50) {
        heightSub = heightVal;
      }
    }
    
    if (widthSub !== -1 && heightSub !== -1) {
      if (widthSub > heightSub) {
        return heightSub;
      } else {
        return widthSub;
      }
    } else if (widthSub !== -1) {
      return widthSub;
    } else if (heightSub !== -1) {
      return heightSub;
    }

    return -1
  }

  function calculate() {
    const {
      filteredWasteInWidthArr, 
      filteredWasteInHeightArr
    } = calcWaste(trueWidth, trueHeight, currentMaterial);

    const resultObj = makeResult(filteredWasteInWidthArr, filteredWasteInHeightArr, width, height, currentMaterial.size);

    const edgeValue = edgeValues(width, height, currentMaterial.size);
    console.log(edgeValue);
    // const messageObj = resultMsg(resultObj, currentMaterial)

    // console.log(currentMaterial);
    // console.log(resultObj);

    // setResult(resultObj);

    const resMsg = resultMsg(resultObj, checkboxState, edgeValue);
    setResult(resMsg);

    setDone(true);
  }

  return (
    <>
      <Options 
        materials={materials} 
        onChange={(event) => handleOptionsChange(event)} />
      <Input 
        value={width} 
        onChange={(event) => {
          setWidth(event.target.value);
          setTrueWidth(event.target.value);
        }} />
      <Input 
        value={height} 
        onChange={(event) => {
          setHeight(event.target.value);
          setTrueHeight(event.target.value);
        }} />
      <Display sizes={currentMaterial.size} />
      <BannerVariation 
        key={activeGroup}
        isBanner={isBanner}
        checkboxState={checkboxState}
        activeGroup={activeGroup}
        onCheckboxChange={handleCheckboxChange}
        onRadioChange={handleRadioChange}
      />
      <CanvasVariation 
        isCanvas={isCanvas} 
        onChange={handleCanvasOptionChange} 
        isStandardChecked={isStandardChecked} 
        onStandardCheckboxChange={handleStandardCheckboxChange} 
      />
      <Button onClick={() => console.log('Button reset')} name="СБРОС" />
      <Button onClick={() => calculate()} name="РАССЧИТАТЬ" />
      <Result result={result} done={done} />
      <Recommendation />
    </>
  )
}

export default App
