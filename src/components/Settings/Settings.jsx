import { useEffect, useState } from 'react';
import './Settings.css';

const materialTypes = [
  {id: 1, value: 'banner', label: 'баннер'},
  {id: 2, value: 'vinyl', label: 'пленка'},
  {id: 3, value: 'paper', label: 'бумага'},
  {id: 4, value: 'canvas', label: 'холст'}
];

function Settings() {
  const [data, setData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [sizeText, setSizeText] = useState('');

  const [form, setForm] = useState({
    name: '',
    description: '',
    size: [],
    type: 'banner',
  });

  useEffect(() => {
    fetch('materials.json')
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const handleSelect = (index) => {
    const item = data[index];
    setSelectedIndex(index);
    setForm({ ...item });
    setSizeText(item.size.join('\n'));
  };

  const handleFormChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // const handleSizeChange = (e) => {
  //   const lines = e.target.value.split('\n').filter(Boolean);
  //   setForm((prev) => ({ ...prev, size: lines }));
  // };

  const handleSizeChange = (e) => {
    const value = e.target.value;
    setSizeText(value);
    const lines = value.split('\n').map(s => s.trim()).filter(Boolean);
    setForm((prev) => ({ ...prev, size: lines }));
  };

  const handleSave = () => {
    const updatedData = [...data];
    if (selectedIndex === null) {
      updatedData.push(form);
          console.log(form);
    } else {
      updatedData[selectedIndex] = form;
    }
    setData(updatedData);
    setSelectedIndex(null);
    setForm({ name: '', description: '', size: [], type: 'banner' });
    setSizeText('');
  };

  const handleNewMaterial = () => {
    setSelectedIndex(null);
    setForm({ name: '', description: '', size: [], type: 'banner' });
    setSizeText('');
    console.log('sizeText', sizeText);
  };

  // const handleNewMaterial = () => {
  //   setSelectedIndex(null);
  //   setForm({ name: '', description: '', size: [], type: 'banner' });
  // };

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
    setSelectedIndex(null);
  };

  return (
    <div className="settings">
      <div className="material-list">
        <div className="material-item add" onClick={handleNewMaterial}>
          Добавить новый материал
        </div>
        {data.map((item, index) => (
          <div key={index} className="material-item">
            <span onClick={() => handleSelect(index)}>{item.description}</span>
            <button onClick={() => handleDelete(index)}>×</button>
          </div>
        ))}
      </div>

      <div className="material-form">
        <label>
          Внутреннее имя
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleFormChange('name', e.target.value)}
          />
        </label>
        <label>
          Название
          <input
            type="text"
            value={form.description}
            onChange={(e) => handleFormChange('description', e.target.value)}
          />
        </label>
        <label>
          Размеры
          <textarea
            value={sizeText}
            onChange={handleSizeChange}
            rows={6}
          />
        </label>
        <label>
          Тип
          <select
            value={form.type}
            onChange={(e) => handleFormChange('type', e.target.value)}
          >
            {materialTypes.map((type) => (
              <option key={type.id} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </label>

        <button onClick={handleSave}>
          {selectedIndex === null ? 'Добавить' : 'Сохранить'}
        </button>
      </div>
    </div>
  );
}

export default Settings;


// import { useEffect, useState } from 'react';
// import './Settings.css';

// function Settings() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetch('materials.json')
//       .then(response => response.json())
//       .then(data => setData(data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   return (
//     <div className="settings">
//       {data ? (
//         <ul>
//           {data.map((item, index) => (
//             <li key={index}>{item.description}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// export default Settings;