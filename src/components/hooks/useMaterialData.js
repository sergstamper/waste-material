import { useState, useEffect } from 'react';

function useMaterialData() {
  const [materials, setMaterials] = useState([]);
  const [currentMaterial, setCurrentMaterial] = useState(null);
  
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch('./materials.json');
        const data = await response.json();
        setMaterials(data);
        setCurrentMaterial(data[0]);
      } catch (error) {
        console.error('Error loading materials:', error);
      }
    };
    
    fetchMaterials();
  }, []);

  return { materials, currentMaterial, setCurrentMaterial };
};

export default useMaterialData;