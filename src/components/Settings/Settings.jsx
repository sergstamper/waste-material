import { useEffect, useState } from 'react';
import './Settings.css';
import Button from '../Button/Button';
import Input from '../Input/Input';

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

  const initialFormState = {
    name: '',
    description: '',
    size: [],
    type: 'banner',
  }

  const [form, setForm] = useState(initialFormState);

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
    if (!form.name || !form.description || !form.size.length) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }
    const updatedData = [...data];
    if (selectedIndex === null) {
      updatedData.push(form);
          console.log(form);
    } else {
      updatedData[selectedIndex] = form;
    }
    setData(updatedData);
    setSelectedIndex(null);
    setForm(initialFormState);
    setSizeText('');
  };

  const handleNewMaterial = () => {
    setSelectedIndex(null);
    setForm(initialFormState);
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
    setForm(initialFormState);
    setSizeText('');
  };

  return (
    <div className="settings">
      <div className="material-list">
        <div className="material-item add" onClick={handleNewMaterial}>
          <span>Добавить новый материал</span>
          <Button 
            onClick={handleNewMaterial}
            id='add'
            className='add-material-button' />
        </div>
        {data.map((item, index) => (
          <div key={index} className="material-item">
            <span onClick={() => handleSelect(index)}>{item.description}</span>
            <Button 
              onClick={() => handleDelete(index)}
              id='delete'
              className='delete-item-button' />
          </div>
        ))}
      </div>

      <div className="material-form">
        <Input
          label="Внутреннее имя"
          value={form.name}
          id='inner-name'
          className='input-settings'
          onChange={(e) => handleFormChange('name', e.target.value)}
        />
        
        <Input
          label="Название"
          value={form.description}
          id='description'
          className='input-settings'
          onChange={(e) => handleFormChange('description', e.target.value)}
        />

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

        <Button 
          onClick={handleSave} 
          id='save' 
          className='save-button'
          name={selectedIndex === null ? 'ДОБАВИТЬ' : 'СОХРАНИТЬ'} 
        />
      </div>
    </div>
  );
}

export default Settings;
