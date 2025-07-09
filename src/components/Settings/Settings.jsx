import { useEffect, useState } from 'react';
import './Settings.css';

function Settings() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('materials.json')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="settings">
      {data ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item.description}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Settings;