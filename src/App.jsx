import { useState, useEffect } from 'react'
import './App.css'

import Options from './components/Options/Options';
import Input from './components/Input/Input';
import Display from './components/Display/Display';
import Variation from './components/Variation/Variation';
import Recommendation from './components/Recommendation/Recommendation';
import Button from './components/Button/Button';
import Result from './components/Result/Result';

function App() {
  const [materials, setMaterials] = useState([]);
  const [currentMaterial, setCurrentMaterial] = useState([]);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [trueWidth, setTrueWidth] = useState("");
  const [trueHeight, setTrueHeight] = useState("");
  const [result, setResult] = useState("");
  const [checkboxState, setCheckboxState] = useState({});
  const [activeGroup, setActiveGroup] = useState('underside');

  useEffect(() => {
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
    setCheckboxState(initialCheckboxState);
  }, []);

  useEffect(() => {
    fetch('./materials.json')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        setMaterials(data);
        setCurrentMaterial(data[0]);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

function handleOptionsChange(event) {
  const materialValue = event.target.value;
  materials.forEach((material) => {
    if (material.name === materialValue) {
      setCurrentMaterial(material);
    }
  });
}

function checkMaterial() {
  if (currentMaterial.type === 'banner') {
    console.log('banner')
  } else if (currentMaterial.type === 'canvas') {
    console.log('canvas')
  } else if (currentMaterial.type === 'vinyl' || currentMaterial.type === 'paper') {
    console.log('vinyl or paper')
  } 
};

const updateDimensions = (checkboxState) => {
  let tempWidth = parseFloat(width) || 0;
  let tempHeight = parseFloat(height) || 0;

  // Логика для группы "Подворот"
  if (checkboxState['left-1']) tempWidth += 40;
  if (checkboxState['right-1']) tempWidth += 40;
  if (checkboxState['top-1']) tempHeight += 40;
  if (checkboxState['bottom-1']) tempHeight += 40;

  // Логика для группы "Карманы"
  if (checkboxState['left-2']) tempWidth += 100;
  if (checkboxState['right-2']) tempWidth += 100;
  if (checkboxState['top-2']) tempHeight += 100;
  if (checkboxState['bottom-2']) tempHeight += 100;

  // Обновляем ширину и высоту
  setTrueWidth(tempWidth.toString());
  setTrueHeight(tempHeight.toString());

  console.log(trueWidth);
  console.log(trueHeight);
};

function calculate() {
  let minWaste = 3200;
  let wasteWidth = 0;
  let wasteHeight = 0;
  let orientation = 'width';
  let waste = 0;
  
  checkMaterial();

  currentMaterial.size.forEach((size) => {
      wasteWidth = +size - +width;
      wasteHeight = +size - +height;

      if (wasteWidth < minWaste && wasteWidth >= 20) {
        minWaste = wasteWidth;
        orientation = 'width';
      }

      if (wasteHeight < minWaste && wasteHeight >= 20) {
        minWaste = wasteHeight;
        orientation = 'height';
      }

      // console.log(`${size}: ${wasteWidth}`);
      // console.log(`${size}: ${wasteHeight}`);
      // console.log(minWaste);
      // console.log(orientation);
    }
  )

  if (orientation === 'height') {
    const temp = trueWidth;
    setTrueWidth(trueHeight);
    setTrueHeight(temp);
  }

  waste = (minWaste/1000)*(trueHeight/1000);
  setResult(waste);

  // setWidth(tempWidth);
  // setHeight(tempHeight);

  console.log(height);
}

const handleRadioChange = (event) => {
  setActiveGroup(event.target.value);
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

  return (
    <>
      <Options 
        materials={materials} 
        onChange={(event) => handleOptionsChange(event)} />
      <Input 
        value={width} 
        onChange={(event) => setWidth(event.target.value)} />
      <Input 
        value={height} 
        onChange={(event) => setHeight(event.target.value)} />
      <Display sizes={currentMaterial.size} />
      <Variation 
        checkboxState={checkboxState}
        activeGroup={activeGroup}
        onCheckboxChange={handleCheckboxChange}
        onRadioChange={handleRadioChange}
      />
      <Button onClick={() => console.log('Button reset')} name="СБРОС" />
      <Button onClick={() => calculate()} name="РАССЧИТАТЬ" />
      <Result result={result} />
      <Recommendation />
    </>
  )
}

export default App
