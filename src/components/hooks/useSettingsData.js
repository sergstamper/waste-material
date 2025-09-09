import { useState, useEffect } from 'react';

function useSettingsData() {
  const [undersideSize, setUndersideSize] = useState('');
  const [pocketSize, setPocketSize] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('./settings.json');
        const data = await response.json();
        setUndersideSize(data.underside);
        setPocketSize(data.pocket);
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };

    fetchSettings();
  }, []);

  return { undersideSize, pocketSize };
};

export default useSettingsData;