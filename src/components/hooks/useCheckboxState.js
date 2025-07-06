import { useState } from 'react';

function useCheckboxState() {
    const INITIAL_CHECKBOX_STATE = {
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

  const [checkboxState, setCheckboxState] = useState(INITIAL_CHECKBOX_STATE);
  
  const resetCheckboxState = () => {
    setCheckboxState(INITIAL_CHECKBOX_STATE);
  };

  return { checkboxState, setCheckboxState, resetCheckboxState };
};

export default useCheckboxState;