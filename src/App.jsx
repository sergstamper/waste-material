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
  const [result, setResult] = useState("");
  const [checkboxState, setCheckboxState] = useState({});
  const [activeGroup, setActiveGroup] = useState("Подворот");

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

function calculate() {
  let minWaste = 3200;
  let wasteWidth = 0;
  let wasteHeight = 0;
  let orientation = 'width';
  let waste = 0;
  let tempWidth = width;
  let tempHeight = height;

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
    const temp = tempWidth;
    tempWidth = tempHeight;
    tempHeight = temp;
  }

  waste = (minWaste/1000)*(tempHeight/1000);
  setResult(waste);

  setWidth(tempWidth);
  setHeight(tempHeight);

  console.log(height);
}

const handleRadioChange = (event) => {
  setActiveGroup(event.target.value);
};

const handleCheckboxChange = (event) => {
  const { id, checked } = event.target;

  if (id.includes(activeGroup === "Подворот" ? "-1" : "-2")) {
    setCheckboxState((prevState) => {
      const updatedState = { ...prevState };

      if (id.includes("center")) {
        const groupId = id.split("-")[1];
        for (const key in updatedState) {
          if (key.endsWith(`-${groupId}`)) {
            updatedState[key] = checked;
          }
        }
      } else {
        updatedState[id] = checked;
      }

      return updatedState;
    });
  }
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
