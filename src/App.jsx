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

  const [isBanner, setIsBanner] = useState(false);
  const [isCanvas, setIsCanvas] = useState(false);
  const [isStandardChecked, setIsStandardChecked] = useState(false);
  const [canvasOption, setCanvasOption] = useState('zero');

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
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function initial() {

  }

function handleOptionsChange(event) {
  const materialValue = event.target.value;
  console.log(materialValue);
  materials.forEach((material) => {
    if (material.name === materialValue) {
      setCurrentMaterial(material);
      checkMaterial(material.type);
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

// function checkSizes() {
//   if (+trueWidth > +currentMaterial.size[currentMaterial.size.length-1] 
//     && +trueHeight > +currentMaterial.size[currentMaterial.size.length-1]) {
//     if (+trueHeight > +trueWidth) {
//       const temp = trueWidth;
//       setTrueWidth(trueHeight);
//       setTrueHeight(temp);
//     }
//   } else if (+trueWidth > +currentMaterial.size[currentMaterial.size.length-1] 
//   || +trueHeight > +currentMaterial.size[currentMaterial.size.length-1]) {
//     if (+trueHeight > +trueWidth) {
//       const temp = trueWidth;
//       setTrueWidth(trueHeight);
//       setTrueHeight(temp);
//     }
//   } else if (+trueHeight > +trueWidth) {
//     const temp = trueWidth;
//     setTrueWidth(trueHeight);
//     setTrueHeight(temp);
//   }
// }

function calculate() {
  // checkSizes();
  const widthArray = [];
  const heightArray = [];
  let currentWidth = trueWidth;
  let currentHeight = trueHeight;
  let resultWidth = 0;
  let resultHeight = 0;
  let repeat = 1

  console.log(currentWidth, currentHeight, '- first');
  if (+currentWidth > +currentMaterial.size[currentMaterial.size.length-1] 
    && +currentHeight > +currentMaterial.size[currentMaterial.size.length-1]) {
    if (+currentHeight > +currentWidth) {
      const temp = currentWidth;
      currentWidth = currentHeight;
      currentHeight = temp;
    }
  } else if (+trueWidth > +currentMaterial.size[currentMaterial.size.length-1] 
  || +trueHeight > +currentMaterial.size[currentMaterial.size.length-1]) {
    if (+currentHeight > +currentWidth) {
      const temp = currentWidth;
      currentWidth = currentHeight;
      currentHeight = temp;
    }
  } else if (+currentHeight > +currentWidth) {
    const temp = currentWidth;
    currentWidth = currentHeight;
    currentHeight = temp;
  }

  console.log(currentWidth, currentHeight, '- after change');
  
  currentMaterial.size.forEach((size) => {
    repeat = Math.ceil(currentWidth/size);
    if (repeat > 1) {
      resultWidth = currentWidth/repeat;
      resultHeight = currentHeight*repeat;
    } else {
      resultWidth = currentWidth;
      resultHeight = currentHeight;
    }
    widthArray.push(resultWidth);
    heightArray.push(resultHeight);

  });
  console.log(widthArray);
  console.log(heightArray);
}

// function calculate() {
//   let minWaste = 3200;
//   let wasteWidth = 0;
//   let wasteHeight = 0;
//   let orientation = 'width';
//   let waste = 0;
//   setTrueWidth(width);
//   setTrueHeight(height);
  
//   // checkMaterial();

//   currentMaterial.size.forEach((size) => {
//       wasteWidth = +size - +width;
//       wasteHeight = +size - +height;

//       if (wasteWidth < minWaste && wasteWidth >= 20) {
//         minWaste = wasteWidth;
//         orientation = 'width';
//       }

//       if (wasteHeight < minWaste && wasteHeight >= 20) {
//         minWaste = wasteHeight;
//         orientation = 'height';
//       }

//       // console.log(`${size}: ${wasteWidth}`);
//       // console.log(`${size}: ${wasteHeight}`);
//       // console.log(minWaste);
//       // console.log(orientation);
//     }
//   )

//   if (orientation === 'height') {
//     const temp = trueWidth;
//     setTrueWidth(trueHeight);
//     setTrueHeight(temp);
//   }

//   waste = (minWaste/1000)*(trueHeight/1000);
//   setResult(waste);

//   // setWidth(tempWidth);
//   // setHeight(tempHeight);


// }

const handleRadioChange = (event) => {
  const newGroup = event.target.value;
  setActiveGroup(newGroup);
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
};

function handleCanvasChoise(value, isStandardChecked) {
  let cutSmall = 0;
  let cutBig = 0;

  if (isStandardChecked) {
    cutSmall = 50;
    cutBig = 80;
  }
  if (value === 'zero') {
    setTrueWidth(width);
    setTrueHeight(height);
  } else if (value === '15x30') {
    setTrueWidth(width+90-cutSmall);
    setTrueHeight(height+90-cutSmall);
  } else if (value === '17x45') {
    setTrueWidth(width+124-cutBig);
    setTrueHeight(height+124-cutBig);
  } else if (value === '23x45') {
    setTrueWidth(width+136-cutBig);
    setTrueHeight(height+136-cutBig);
  }
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

// const handleInputSize = (event) => {
//   const value = event.target.value;
//   const inputName = event.target.name;

//   console.log(value, inputName);

//   if (inputName === 'width') {
//     setWidth(value);
//     setTrueWidth(value);
//   } else if (inputName === 'height') {
//     setHeight(value);
//     setTrueHeight(value);
//   }
// }

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
      <Result result={result} width={trueWidth} height={trueHeight} />
      <Recommendation />
    </>
  )
}

export default App
