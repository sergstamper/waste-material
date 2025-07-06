import { useState } from 'react';

function useMaterialType() {
  const [isBanner, setIsBanner] = useState(false);
  const [isCanvas, setIsCanvas] = useState(false);

  const checkMaterialType = (type) => {
    setIsBanner(type === 'banner');
    setIsCanvas(type === 'canvas');
  };

  return { isBanner, isCanvas, checkMaterialType };
};

export default useMaterialType;