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

function calculate() {
  let minWaste = 3200;
  let wasteWidth = 0;
  let wasteHeight = 0;
  currentMaterial.size.forEach((size) => {
      wasteWidth = +size - +width;
      wasteHeight = +size - +height;
      if (wasteWidth < minWaste && wasteWidth >= 0) {
        minWaste = wasteWidth;
      }
      if (wasteHeight < minWaste && wasteHeight >= 0) {
        minWaste = wasteHeight;
      }
      console.log(`${size}: ${wasteWidth}`);
      console.log(`${size}: ${wasteHeight}`);
      console.log(minWaste);
    }
  )
}

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
      <Variation />
      <Button onClick={() => console.log('Button reset')} name="СБРОС" />
      <Button onClick={() => calculate()} name="РАССЧИТАТЬ" />
      <Result />
      <Recommendation />
    </>
  )
}

export default App
