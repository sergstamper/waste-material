import { useState, useEffect } from 'react';
import './Main.css';

// Components
import InputData from '../InputData/InputData';
import MaterialOptions from '../MaterialOptions/MaterialOptions';
import ButtonsBlock from '../ButtonsBlock/ButtonsBlock';
import Result from '../Result/Result';
import Modal from '../Modal/Modal';
import DisplayVariants from '../DisplayVariants/DisplayVariants';

// Utils
import canvasChoise from '../functions/canvasChoise';
import calcDimensions from '../functions/calcDimensions';
import calcWaste from '../functions/calcWaste';
import makeResult from '../functions/makeResult';
import resultMsg from '../functions/resultMsg';
import edgeValues from '../functions/edgeValues';
import filterMaterial from '../functions/filterMaterial';
import copy from '../functions/copy';

// Hooks
import useMaterialData from '../hooks/useMaterialData';
import useSettingsData from '../hooks/useSettingsData';
import useDimensions from '../hooks/useDimensions';
import useCheckboxState from '../hooks/useCheckboxState';
import useMaterialType from '../hooks/useMaterialType';
import useCanvasOptions from '../hooks/useCanvasOptions';
import useModal from '../hooks/useModal';

function Main() {
  // State hooks
  const { materials, currentMaterial, setCurrentMaterial } = useMaterialData();
  const { undersideSize, pocketSize } = useSettingsData();
  const { width, height, trueWidth, trueHeight, handleSizeChange, setWidth, setHeight, setTrueWidth, setTrueHeight } = useDimensions();
  const { checkboxState, setCheckboxState, resetCheckboxState } = useCheckboxState();
  const { isBanner, isCanvas, checkMaterialType } = useMaterialType();
  const { canvasOption, isStandardChecked, handleCanvasOptionChange, handleStandardCheckboxChange } = useCanvasOptions();
  const { isModalOpen, openModal, closeModal } = useModal();
  
  const [activeGroup, setActiveGroup] = useState('underside');
  const [widthWaste, setWidthWaste] = useState([]);
  const [heightWaste, setHeightWaste] = useState([]);
  const [result, setResult] = useState({});
  const [done, setDone] = useState(false);
  const [is1440Checked, setIs1440Checked] = useState(false);

  // Effects
  useEffect(() => {
    if (currentMaterial) {
      checkMaterialType(currentMaterial.type);
    }
  }, [currentMaterial, checkMaterialType]);

  useEffect(() => {
    if (isCanvas && width && height) {
      const { canvWidth, canvHeight } = canvasChoise(canvasOption, width, height, isStandardChecked);
      setTrueWidth(canvWidth);
      setTrueHeight(canvHeight);
    }
  }, [canvasOption, isStandardChecked, width, height, isCanvas, setTrueWidth, setTrueHeight]);

  // Handlers
  const handleOptionsChange = (event) => {
    const materialValue = event.target.value;
    const selectedMaterial = materials.find(material => material.name === materialValue);
    
    if (selectedMaterial) {
      resetCheckboxState();
      setWidthWaste([]);
      setHeightWaste([]);
      setDone(false);
      setCurrentMaterial(selectedMaterial);
      
      if (selectedMaterial.type !== 'banner' && trueWidth && trueHeight) {
        setTrueWidth(width);
        setTrueHeight(height);
      }
    }
  };

  const handleRadioChange = (event) => {
    setActiveGroup(event.target.value);
    resetCheckboxState();
    setTrueWidth(width);
    setTrueHeight(height);
  };

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    const groupSuffix = activeGroup === 'underside' ? '-1' : '-2';

    setCheckboxState(prevState => {
      const updatedState = { ...prevState };

      if (id.includes('center')) {
        // Update all checkboxes in the group
        Object.keys(updatedState).forEach(key => {
          if (key.endsWith(groupSuffix)) {
            updatedState[key] = checked;
          }
        });
      } else {
        updatedState[id] = checked;

        // Check if all non-center checkboxes are checked
        const allChecked = Object.keys(updatedState).every(key => 
          key.endsWith(groupSuffix) && !key.includes('center') ? updatedState[key] : true
        );

        updatedState[`center${groupSuffix}`] = allChecked;
      }

      const { tempWidth, tempHeight } = calcDimensions(updatedState, width, height, undersideSize, pocketSize);
      setTrueWidth(tempWidth.toString());
      setTrueHeight(tempHeight.toString());

      return updatedState;
    });
  };

  const calculate = () => {
    if (!width || !height || !currentMaterial) return;

    const currentFilteredMaterial = filterMaterial(currentMaterial, is1440Checked);
    const { filteredWasteInWidthArr, filteredWasteInHeightArr } = 
      calcWaste(trueWidth, trueHeight, currentFilteredMaterial);

    if (!isCanvas) {
      setWidthWaste(filteredWasteInWidthArr);
      setHeightWaste(filteredWasteInHeightArr);
    }

    const resultObj = makeResult(filteredWasteInWidthArr, filteredWasteInHeightArr);
    const edgeValue = edgeValues(width, height, currentFilteredMaterial.size, undersideSize);
    const resMsg = resultMsg(resultObj, checkboxState, edgeValue, isCanvas, undersideSize);
    
    setResult(resMsg);
    setDone(true);
  };

  const reset = () => {
    if (materials.length > 0) {
      setCurrentMaterial(materials[0]);
    }
    setWidth('');
    setHeight('');
    setTrueWidth('');
    setTrueHeight('');
    resetCheckboxState();
    setResult({});
    setDone(false);
    setIs1440Checked(false);
    checkMaterialType(materials[0]?.type || '');
  };

  if (!currentMaterial) return <div>Loading...</div>;

  return (
    <>
      <InputData 
        materials={materials} 
        currentMaterial={currentMaterial}
        width={width} 
        height={height} 
        sizes={currentMaterial.size}
        onOptionChange={handleOptionsChange} 
        onWidthChange={handleSizeChange}
        onHeightChange={handleSizeChange}
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
        onCheckbox1440Change={(e) => setIs1440Checked(e.target.checked)}
        checkbox1440State={is1440Checked}
        undersideSize={undersideSize}
        pocketSize={pocketSize}
      />

      <ButtonsBlock
        onReset={reset}
        onCalculate={calculate}
      />

      <Result 
        result={result} 
        done={done}
        onVariantClick={openModal} 
        onCopy={() => copy({
          currentMaterial, 
          width, 
          height, 
          result, 
          isBanner, 
          isCanvas, 
          checkboxState, 
          is1440Checked, 
          canvasOption
        })}
      />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="info-block">
          <DisplayVariants 
            wasteArr={widthWaste}
            className={'info-vertical-list'}
            title={'По вертикали'}
            imgSrc={'./vert.svg'}
          />

          <DisplayVariants 
            wasteArr={heightWaste}
            className={'info-horizontal-list'}
            title={'По горизонтали'}
            imgSrc={'./horiz.svg'}
          />
        </div>
      </Modal>
    </>
  );
}

export default Main;

// import { useState, useEffect } from 'react'
// import './App.css'

// import InputData from './components/InputData/InputData';
// import MaterialOptions from './components/MaterialOptions/MaterialOptions';
// import ButtonsBlock from './components/ButtonsBlock/ButtonsBlock';
// import Result from './components/Result/Result';

// import canvasChoise from './components/functions/canvasChoise';
// import calcDimensions from './components/functions/calcDimensions';
// import calcWaste from './components/functions/calcWaste';
// import makeResult from './components/functions/makeResult';
// import resultMsg from './components/functions/resultMsg';
// import edgeValues from './components/functions/edgeValues';
// import filterMaterial from './components/functions/filterMaterial';
// import Modal from './components/Modal/Modal';
// import DispalyVariants from './components/DispalyVariants/DisplayVariants';
// import copy from './components/functions/copy';

// function App() {
//   const [materials, setMaterials] = useState([]);
//   const [currentMaterial, setCurrentMaterial] = useState([]);
//   const [width, setWidth] = useState('');
//   const [height, setHeight] = useState('');
//   const [trueWidth, setTrueWidth] = useState('');
//   const [trueHeight, setTrueHeight] = useState('');
//   const [result, setResult] = useState({});
//   const [done, setDone] = useState(false);
//   const [checkboxState, setCheckboxState] = useState({});
//   const [activeGroup, setActiveGroup] = useState('underside');
//   const [canvasOption, setCanvasOption] = useState('zero');
//   const [widthWaste, setWidthWaste] = useState([]);
//   const [heightWaste, setHeightWaste] = useState([]);

//   const [isBanner, setIsBanner] = useState(false);
//   const [isCanvas, setIsCanvas] = useState(false);
//   const [isStandardChecked, setIsStandardChecked] = useState(false);
//   const [is1440Checked, setIs1440Checked] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const initialCheckboxState = {
//     'top-1': false,
//     'left-1': false,
//     'center-1': false,
//     'right-1': false,
//     'bottom-1': false,
//     'top-2': false,
//     'left-2': false,
//     'center-2': false,
//     'right-2': false,
//     'bottom-2': false,
//   };

//   useEffect(() => {
//     setCheckboxState(initialCheckboxState);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     fetch('./materials.json')
//     .then((response) => {
//         return response.json();
//     })
//     .then((data) => {
//         setMaterials(data);
//         setCurrentMaterial(data[0]);
//         checkMaterial(data[0].type);
//         setDone(false);
//     });
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   function handleSizeChange(event) {
//     const { value, id } = event.target;
//     const regExp = /^$|^(0|[1-9]\d*)$/;
    
//     if (value !== '' && !regExp.test(value)) return;

//     if (id === 'width') {
//       setWidth(value);
//       setTrueWidth(value);
//     } else if (id === 'height') {
//       setHeight(value);
//       setTrueHeight(value);
//     }
//   }

//   function handleOptionsChange(event) {
//     const materialValue = event.target.value;
//     setCheckboxState(initialCheckboxState);
//     setWidthWaste([]);
//     setHeightWaste([]);
//     setDone(false);
//     materials.forEach((material) => {
//       if (material.name === materialValue) {
//         setCurrentMaterial(material);
//         checkMaterial(material.type);
//       }

//       if (material.type !== 'banner' && trueWidth && trueHeight) {
//         setTrueWidth(width);
//         setTrueHeight(height);
//       }
//     });
//   }

//   function checkMaterial(type) {
//     if (type === 'banner') {
//       setCheckboxState(initialCheckboxState);
//       setIsBanner(true);
//       setIsCanvas(false);
//     } else if (type === 'canvas') {
//       setCheckboxState(initialCheckboxState);
//       setIsBanner(false);
//       setIsCanvas(true);
//     } else {
//       setCheckboxState(initialCheckboxState);
//       setIsBanner(false);
//       setIsCanvas(false);
//     }
//   };

//   const handleRadioChange = (event) => {
//     const newGroup = event.target.value;
//     setActiveGroup(newGroup);
//     setCheckboxState(initialCheckboxState);
//     setTrueWidth(width);
//     setTrueHeight(height);
//   };

//   const handleCheckboxChange = (event) => {
//     const { id, checked } = event.target;
//     const groupSuffix = activeGroup === 'underside' ? '-1' : '-2';

//     setCheckboxState((prevState) => {
//       const updatedState = { ...prevState };

//       if (id.includes('center')) {
//         for (const key in updatedState) {
//           if (key.endsWith(groupSuffix)) {
//             updatedState[key] = checked;
//           }
//         }
//       } else {
//         updatedState[id] = checked;

//         const allChecked = Object.keys(updatedState).every((key) => {
//           if (key.endsWith(groupSuffix) && !key.includes('center')) {
//             return updatedState[key];
//           }
//           return true;
//         });

//         updatedState[`center${groupSuffix}`] = allChecked;
//       }

//       updateDimensions(updatedState);

//       return updatedState;
//     });
//   };

//   function handleCheckbox1440Change(event) {
//     const { checked } = event.target;
//     setIs1440Checked(checked);
//   }

//   function updateDimensions(checkboxState) {
//     let { tempWidth, tempHeight } = calcDimensions(checkboxState, width, height);

//     setTrueWidth(tempWidth.toString());
//     setTrueHeight(tempHeight.toString());
//   };

//   function handleCanvasChoise(value, isStandardChecked) {
//     const { canvWidth, canvHeight } = canvasChoise(value, width, height, isStandardChecked);
//     setTrueWidth(canvWidth);
//     setTrueHeight(canvHeight);
//   }

//   const handleCanvasOptionChange = (event) => {
//     const value = event.target.value;
//     setCanvasOption(value);
//     handleCanvasChoise(value, isStandardChecked);
//   };

//   const handleStandardCheckboxChange = (event) => {
//     const isChecked = event.target.checked;
//     setIsStandardChecked(isChecked);
//     handleCanvasChoise(canvasOption, isChecked);
//   };

//   function calculate() {
//     if (width !== '' && height !== '') {
//       const currentFilteredMaterial = filterMaterial(currentMaterial, is1440Checked)

//       const {
//         filteredWasteInWidthArr, 
//         filteredWasteInHeightArr
//       } = calcWaste(trueWidth, trueHeight, currentFilteredMaterial);

//       if (!isCanvas) {
//         setWidthWaste(filteredWasteInWidthArr);
//         setHeightWaste(filteredWasteInHeightArr);
//       }

//       const resultObj = makeResult(filteredWasteInWidthArr, filteredWasteInHeightArr);

//       const edgeValue = edgeValues(width, height, currentFilteredMaterial.size);
      
//       const resMsg = resultMsg(resultObj, checkboxState, edgeValue, isCanvas);
//       setResult(resMsg);
//       console.log('Результат:', resMsg);

//       setDone(true);
//     } else {
//       setDone(false);
//       setResult({});
//     }
//   }

//   function reset() {
//     setCurrentMaterial(materials[0]);
//     setWidth('');
//     setHeight('');
//     setTrueWidth('');
//     setTrueHeight('');
//     setCheckboxState(initialCheckboxState);
//     setResult({});
//     setDone(false);
//     setIsBanner(false);
//     setIsCanvas(false);
//     setIsStandardChecked(false);
//     setIs1440Checked(false);
    
//     checkMaterial(materials[0].type);
//   }

//   return (
//     <>
//       <InputData 
//         materials={materials} 
//         currentMaterial={currentMaterial}
//         width={width} 
//         height={height} 
//         sizes={currentMaterial.size}
//         onOptionChange={(event) => handleOptionsChange(event)} 
//         onWidthChange={(event) => handleSizeChange(event)}
//         onHeightChange={(event) => handleSizeChange(event)}
//       />

//       <MaterialOptions
//         isBanner={isBanner}
//         isCanvas={isCanvas}
//         keyGroup={activeGroup}
//         checkboxState={checkboxState}
//         activeGroup={activeGroup}
//         onCheckboxChange={handleCheckboxChange}
//         onRadioChange={handleRadioChange}
//         onCanvasCheckboxChange={handleCanvasOptionChange} 
//         isStandard={isStandardChecked} 
//         onStandardChange={handleStandardCheckboxChange} 
//         onCheckbox1440Change={handleCheckbox1440Change}
//         checkbox1440State={checkboxState['checkbox-1440']}
//       />

//       <ButtonsBlock
//         onReset={() => reset()}
//         onCalculate={() => calculate()}
//       />

//       <Result 
//         result={result} 
//         done={done}
//         onVariantClick={() => setIsModalOpen(true)} 
//         onCopy={() => copy({
//           currentMaterial, 
//           width, 
//           height, 
//           result, 
//           isBanner, 
//           isCanvas, 
//           checkboxState, 
//           is1440Checked, 
//           canvasOption
//         })}
//       />

//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <div className="info-block">
//           <DispalyVariants 
//             waste={widthWaste}
//             className={'info-vertical-list'}
//             title={'По вертикали'}
//           />

//           <DispalyVariants 
//             waste={heightWaste}
//             className={'info-horizontal-list'}
//             title={'По горизонтали'}
//           />
//         </div>
//       </Modal>
//     </>
//   )
// }

// export default App;
