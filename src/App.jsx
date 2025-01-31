import { useState, useEffect } from 'react'
import './App.css'

import Options from './components/Options/Options';
import Input from './components/Input/Input';
import Display from './components/Display/Display';
import Variation from './components/Variation/Variation';
import Recommendation from './components/Recommendation/Recommendation';

function App() {
  const [materials, setMaterials] = useState([]);
  const [currentMaterial, setCurrentMaterial] = useState([]);

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

  return (
    <>
      <Options 
        materials={materials} 
        onChange={(event) => handleOptionsChange(event)} />
      <Input />
      <Input />
      <Display sizes={currentMaterial.size} />
      <Variation />
      <Recommendation />
    </>
  )
}

export default App
