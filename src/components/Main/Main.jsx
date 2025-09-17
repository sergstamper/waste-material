import { useState, useEffect } from 'react';

import './Main.css';

// Components
import InputData from './InputData/InputData';
import MaterialOptions from './MaterialOptions/MaterialOptions';
import ButtonsBlock from './ButtonsBlock/ButtonsBlock';
import Result from './Result/Result';
import Modal from '../Common/Modal/Modal';
import DisplayVariants from './DisplayVariants/DisplayVariants';
import Button from '../Common/Button/Button';

// Utils
import canvasChoise from '../helpers/canvasChoise';
import calcDimensions from '../helpers/calcDimensions';
import calcWaste from '../helpers/calcWaste';
import makeResult from '../helpers/makeResult';
import resultMsg from '../helpers/resultMsg';
import edgeValues from '../helpers/edgeValues';
import filterMaterial from '../helpers/filterMaterial';
import copy from '../helpers/copy';

// Hooks
import useMaterialData from '../hooks/useMaterialData';
import useSettingsData from '../hooks/useSettingsData';
import useDimensions from '../hooks/useDimensions';
import useCheckboxState from '../hooks/useCheckboxState';
import useMaterialType from '../hooks/useMaterialType';
import useCanvasOptions from '../hooks/useCanvasOptions';
import useModal from '../hooks/useModal';

function Main() {
  const { materials, currentMaterial, setCurrentMaterial } = useMaterialData();
  const { undersideSize, pocketSize } = useSettingsData();
  const { width, height, handleSizeChange, setWidth, setHeight } = useDimensions();
  const { checkboxState, setCheckboxState, resetCheckboxState } = useCheckboxState();
  const { isBanner, isCanvas, checkMaterialType } = useMaterialType();
  const { canvasOption, isStandardChecked, handleCanvasOptionChange, handleStandardCheckboxChange } = useCanvasOptions();
  const { isModalOpen, openModal, closeModal } = useModal();

  const [activeGroup, setActiveGroup] = useState('underside');
  const [wasteData, setWasteData] = useState({ width: [], height: [] });
  const [result, setResult] = useState({});
  const [is1440Checked, setIs1440Checked] = useState(false);

  useEffect(() => {
    if (currentMaterial) {
      checkMaterialType(currentMaterial.type);
    }
  }, [currentMaterial, checkMaterialType]);

  const handleOptionsChange = (event) => {
    const materialValue = event.target.value;
    const selectedMaterial = materials.find(m => m.name === materialValue);
    if (!selectedMaterial) return;

    resetCheckboxState();
    setWasteData({ width: [], height: [] });
    setResult({});
    setCurrentMaterial(selectedMaterial);
  };

  const handleRadioChange = (event) => {
    setActiveGroup(event.target.value);
    resetCheckboxState();
  };

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    const groupSuffix = activeGroup === 'underside' ? '-1' : '-2';

    setCheckboxState(prev => {
      const updated = { ...prev };

      if (id.includes('center')) {
        Object.keys(updated).forEach(key => {
          if (key.endsWith(groupSuffix)) updated[key] = checked;
        });
      } else {
        updated[id] = checked;
        const allChecked = Object.keys(updated).every(
          key => (key.endsWith(groupSuffix) && !key.includes('center')) ? updated[key] : true
        );
        updated[`center${groupSuffix}`] = allChecked;
      }

      return updated;
    });
  };

  const calculate = () => {
    if (!width || !height || !currentMaterial) return;

    let { tempWidth, tempHeight } = calcDimensions(
      checkboxState, width, height, undersideSize, pocketSize
    );

    if (isCanvas) {
      const { canvWidth, canvHeight } = canvasChoise(
        canvasOption, tempWidth, tempHeight, isStandardChecked
      );
      tempWidth = canvWidth;
      tempHeight = canvHeight;
    }

    const currentFilteredMaterial = filterMaterial(currentMaterial, is1440Checked);

    const { filteredWasteInWidthArr, filteredWasteInHeightArr } =
      calcWaste(tempWidth, tempHeight, currentFilteredMaterial);

    if (!isCanvas) {
      setWasteData({ width: filteredWasteInWidthArr, height: filteredWasteInHeightArr });
    }

    const resultObj = makeResult(filteredWasteInWidthArr, filteredWasteInHeightArr);
    const edgeValue = edgeValues(width, height, currentFilteredMaterial.size, undersideSize);
    const resMsg = resultMsg(resultObj, checkboxState, edgeValue, isCanvas, undersideSize);

    setResult(resMsg);
  };

  const reset = () => {
    if (materials.length > 0) {
      setCurrentMaterial(materials[0]);
    }
    setWidth('');
    setHeight('');
    resetCheckboxState();
    setResult({});
    setWasteData({ width: [], height: [] });
    setIs1440Checked(false);
  };

  if (!currentMaterial) return <div>Loading...</div>;

  const isDone = Object.keys(result).length > 0;

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
        done={isDone}
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
            wasteArr={wasteData.width}
            className="info-vertical-list"
            title="По вертикали"
            imgSrc="./v-gray.svg"
          />

          <DisplayVariants 
            wasteArr={wasteData.height}
            className="info-horizontal-list"
            title="По горизонтали"
            imgSrc="./h-gray.svg"
          />

          <div className="close-button-container">
            <Button onClick={closeModal} name="ЗАКРЫТЬ" className="modal-close-button" />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Main;
