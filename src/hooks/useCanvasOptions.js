import { useState } from 'react';

function useCanvasOptions() {
  const [canvasOption, setCanvasOption] = useState('zero');
  const [isStandardChecked, setIsStandardChecked] = useState(false);

  const handleCanvasOptionChange = (event) => {
    const value = event.target.value;
    setCanvasOption(value);
  };

  const handleStandardCheckboxChange = (event) => {
    setIsStandardChecked(event.target.checked);
  };

  return {
    canvasOption,
    isStandardChecked,
    handleCanvasOptionChange,
    handleStandardCheckboxChange
  };
};

export default useCanvasOptions;