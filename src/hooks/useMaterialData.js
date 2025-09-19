import { useState, useEffect } from 'react';

function useMaterialData() {
  const [materials, setMaterials] = useState([]);
  const [currentMaterial, setCurrentMaterial] = useState(null);
  const [undersideSize, setUndersideSize] = useState('');
  const [pocketSize, setPocketSize] = useState('');

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch('./materials.json');
        const data = await response.json();
        setMaterials(data);
        setCurrentMaterial(data[0]);
        setUndersideSize(data[data.length - 2].underside);
        setPocketSize(data[data.length - 1].pocket);
      } catch (error) {
        console.error('Error loading materials:', error);
      }
    };
    
    fetchMaterials();
  }, []);

  return { materials, currentMaterial, setCurrentMaterial, undersideSize, pocketSize };
};

export default useMaterialData;