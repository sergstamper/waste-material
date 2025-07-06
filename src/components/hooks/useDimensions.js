import { useState } from 'react';

function useDimensions() {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [trueWidth, setTrueWidth] = useState('');
  const [trueHeight, setTrueHeight] = useState('');

  const handleSizeChange = (event) => {
    const { value, id } = event.target;
    const regExp = /^$|^(0|[1-9]\d*)$/;
    
    if (value !== '' && !regExp.test(value)) return;

    if (id === 'width') {
      setWidth(value);
      setTrueWidth(value);
    } else if (id === 'height') {
      setHeight(value);
      setTrueHeight(value);
    }
  };

  return { 
    width, 
    height, 
    trueWidth, 
    trueHeight, 
    handleSizeChange, 
    setWidth, 
    setHeight,
    setTrueWidth, 
    setTrueHeight 
  };
};

export default useDimensions;