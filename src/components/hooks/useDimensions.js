import { useState } from 'react';

function useDimensions() {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  const handleSizeChange = (event) => {
    const { value, id } = event.target;
    const regExp = /^$|^(0|[1-9]\d*)$/;
    
    if (value !== '' && !regExp.test(value)) return;

    if (id === 'width') {
      setWidth(value);
    } else if (id === 'height') {
      setHeight(value);
    }
  };

  return { 
    width, 
    height, 
    handleSizeChange, 
    setWidth, 
    setHeight
  };
};

export default useDimensions;