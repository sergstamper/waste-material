import { useEffect, useState } from 'react';
import './Settings.css';
// import Button from '../Button/Button';
// import Input from '../Input/Input';
// import TextArea from '../TextArea/TextArea';
// import Select from '../Select/Select';
// import InputOversize from '../InputOversize/InputOversize';
import MaterialForm from '../MaterialForm/MaterialForm';
import MaterialList from '../MaterialList/MaterialList';

const materialTypes = [
  { name: 'banner', description: 'баннер' },
  { name: 'vinyl', description: 'пленка' },
  { name: 'paper', description: 'бумага' },
  { name: 'canvas', description: 'холст' }
];

function Settings() {
  const [data, setData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [sizeText, setSizeText] = useState('');
  const [underside, setUnderside] = useState('');
  const [pocket, setPocket] = useState('');

  const initialFormState = {
    name: '',
    description: '',
    size: [],
    type: 'banner',
  };

  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    fetch('materials.json')
      .then((res) => res.json())
      .then((fetchedData) => setData(fetchedData))
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch('settings.json')
      .then((res) => res.json())
      .then((fetchedData) => {
        setUnderside(fetchedData.underside || '');
        setPocket(fetchedData.pocket || '');
      })
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

  // ✅ Только цифры и перенос строки в textarea
  const handleSizeChange = (e) => {
    const cleaned = e.target.value.replace(/[^\d\n]/g, '');
    setSizeText(cleaned);

    const lines = cleaned
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    setForm((prev) => ({ ...prev, size: lines }));
  };

  const handleSave = () => {
    const updatedData = [...data];
    if (selectedIndex === null) {
      updatedData.push(form);
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
  };

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
    setSelectedIndex(null);
    setForm(initialFormState);
    setSizeText('');
  };

  const handleSaveSize = () => {
    console.log(underside, pocket);
  };

  // ✅ Кнопка активна только при заполненных полях
  const isSaveDisabled =
    !form.name.trim() ||
    !form.description.trim() ||
    !sizeText.trim();

  return (
    <div className="settings">
      {/* <div className="material-list">
        <div className="material-item add" onClick={handleNewMaterial}>
          <span>Добавить новый материал</span>
          <Button
            onClick={handleNewMaterial}
            id="add"
            className="add-material-button"
          />
        </div>
        {data.map((item, index) => (
          <div key={index} className="material-item">
            <span onClick={() => handleSelect(index)}>{item.description}</span>
            <Button
              onClick={() => handleDelete(index)}
              id="delete"
              className="delete-item-button"
            />
          </div>
        ))}
      </div> */}

      <MaterialList
        data={data}
        onNewClick={handleNewMaterial}
        onSelectClick={handleSelect}
        onDeleteClick={handleDelete}
      />

      <MaterialForm
        value={form}
        sizeValue={sizeText}
        options={materialTypes}
        onInnNameChange={(e) => handleFormChange('name', e.target.value)}
        onDescChange={(e) => handleFormChange('description', e.target.value)}
        onSizeChange={handleSizeChange}
        onSelChange={(e) => handleFormChange('type', e.target.value)}
        onClick={handleSave}
        isDisabled={isSaveDisabled}
        selectedIndex={selectedIndex}
        undersideValue={underside}
        pocketValue={pocket}
        onUndersideChange={(e) => setUnderside(e.target.value.replace(/\D/g, ''))}
        onPocketChange={(e) => setPocket(e.target.value.replace(/\D/g, ''))}
        onSaveSize={handleSaveSize}
      />

      {/* <div className="material-form">
        <Input
          label="Внутреннее имя"
          value={form.name}
          id="inner-name"
          className="input-settings"
          onChange={(e) => handleFormChange('name', e.target.value)}
        />

        <Input
          label="Название"
          value={form.description}
          id="description"
          className="input-settings"
          onChange={(e) => handleFormChange('description', e.target.value)}
        />

        <TextArea
          label="Размеры"
          value={sizeText}
          onChange={handleSizeChange}
          rows={5}
          id="size-textarea"
          className="textarea-settings"
        />

        <Select
          label="Тип"
          id="type-select"
          className="select-settings"
          containerClassName="select-container"
          value={form.type}
          options={materialTypes}
          onChange={(e) => handleFormChange('type', e.target.value)}
        />

        <Button
          onClick={handleSave}
          id="save"
          className={isSaveDisabled ? 'save-button disabled' : 'save-button'}
          name={selectedIndex === null ? 'ДОБАВИТЬ' : 'СОХРАНИТЬ'}
          disabled={isSaveDisabled}
        />

        <div className="oversize-container">
          <InputOversize 
            title="Размер подворота"
            value={underside}
            id="underside"
            btnId="set-underside"
            onChange={(e) =>
              setUnderside(e.target.value.replace(/\D/g, ''))
            }
            onClick={handleSaveSize}
          />
          
          <InputOversize 
            title="Размер кармана"
            value={pocket}
            id="pocket"
            btnId="set-pocket"
            onChange={(e) =>
              setPocket(e.target.value.replace(/\D/g, ''))
            }
            onClick={handleSaveSize}
          />
        </div>
      </div> */}
    </div>
  );
}

export default Settings;

          // {/* <div className="form-size-container">
          //   <p className="oversize-title">Размер подворота</p>
          //   <div className="input-oversize">
          //     <Input
          //       label=""
          //       value={underside}
          //       id="underside"
          //       className="input-settings"
          //       onChange={(e) =>
          //         setUnderside(e.target.value.replace(/\D/g, ''))
          //       }
          //     />

          //     <Button
          //       onClick={handleSaveSize}
          //       id="set-underside"
          //       className="set-oversize-button"
          //       name="СОХРАНИТЬ"
          //     />
          //   </div>
          // </div> */}

          //           {/* <div className="form-size-container">
          //   <p className="oversize-title">Размер кармана</p>
          //   <div className="input-oversize">
          //     <Input
          //       label=""
          //       value={pocket}
          //       id="pocket"
          //       className="input-settings"
          //       onChange={(e) => setPocket(e.target.value.replace(/\D/g, ''))}
          //     />

          //     <Button
          //       onClick={handleSaveSize}
          //       id="set-pocket"
          //       className="set-oversize-button"
          //       name="СОХРАНИТЬ"
          //     />
          //   </div>
          // </div> */}



// import { useEffect, useState } from 'react';
// import './Settings.css';
// import Button from '../Button/Button';
// import Input from '../Input/Input';
// import TextArea from '../TextArea/TextArea';
// import Select from '../Select/Select';

// // const materialTypes = [
// //   {id: 1, value: 'banner', label: 'баннер'},
// //   {id: 2, value: 'vinyl', label: 'пленка'},
// //   {id: 3, value: 'paper', label: 'бумага'},
// //   {id: 4, value: 'canvas', label: 'холст'}
// // ];

// const materialTypes = [
//   {name: 'banner', description: 'баннер'},
//   {name: 'vinyl', description: 'пленка'},
//   {name: 'paper', description: 'бумага'},
//   {name: 'canvas', description: 'холст'}
// ];

// function Settings() {
//   const [data, setData] = useState([]);
//   const [selectedIndex, setSelectedIndex] = useState(null);
//   const [sizeText, setSizeText] = useState('');
//   const [underside, setUnderside] = useState('');
//   const [pocket, setPocket] = useState('');

//   const initialFormState = {
//     name: '',
//     description: '',
//     size: [],
//     type: 'banner',
//   }

//   const [form, setForm] = useState(initialFormState);

//   useEffect(() => {
//     fetch('materials.json')
//       .then((res) => res.json())
//       .then((fetchedData) => {
//         setData(fetchedData);
//       })
//       .catch(console.error);
//   }, []);

//   useEffect(() => {
//     fetch('settings.json')
//       .then((res) => res.json())
//       .then((fetchedData) => {
//         setUnderside(fetchedData.underside || '');
//         setPocket(fetchedData.pocket || '');
//       })
//       .catch(console.error);
//   }, []);

//   const handleSelect = (index) => {
//     const item = data[index];
//     setSelectedIndex(index);
//     setForm({ ...item });
//     setSizeText(item.size.join('\n'));
//   };

//   const handleFormChange = (key, value) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   // const handleSizeChange = (e) => {
//   //   const lines = e.target.value.split('\n').filter(Boolean);
//   //   setForm((prev) => ({ ...prev, size: lines }));
//   // };

//   const handleSizeChange = (e) => {
//     const value = e.target.value;
//     setSizeText(value);
//     const lines = value.split('\n').map(s => s.trim()).filter(Boolean);
//     setForm((prev) => ({ ...prev, size: lines }));
//   };

//   const handleSave = () => {
//     if (!form.name || !form.description || !form.size.length) {
//       alert('Пожалуйста, заполните все поля.');
//       return;
//     }
//     const updatedData = [...data];
//     if (selectedIndex === null) {
//       updatedData.push(form);
//           console.log(form);
//     } else {
//       updatedData[selectedIndex] = form;
//     }
//     setData(updatedData);
//     setSelectedIndex(null);
//     setForm(initialFormState);
//     setSizeText('');
//   };

//   const handleNewMaterial = () => {
//     setSelectedIndex(null);
//     setForm(initialFormState);
//     setSizeText('');
//     console.log('sizeText', sizeText);
//   };

//   // const handleNewMaterial = () => {
//   //   setSelectedIndex(null);
//   //   setForm({ name: '', description: '', size: [], type: 'banner' });
//   // };

//   const handleDelete = (index) => {
//     const updatedData = data.filter((_, i) => i !== index);
//     setData(updatedData);
//     setSelectedIndex(null);
//     setForm(initialFormState);
//     setSizeText('');
//   };

//   // const handleSetUnderside = () => {
//   //   setUnderside(underside);
//   // };

//   const handleSaveSize = () => {
//     console.log(underside, pocket);
//   }

//   return (
//     <div className="settings">
//       <div className="material-list">
//         <div className="material-item add" onClick={handleNewMaterial}>
//           <span>Добавить новый материал</span>
//           <Button 
//             onClick={handleNewMaterial}
//             id='add'
//             className='add-material-button' />
//         </div>
//         {data.map((item, index) => (
//           <div key={index} className="material-item">
//             <span onClick={() => handleSelect(index)}>{item.description}</span>
//             <Button 
//               onClick={() => handleDelete(index)}
//               id='delete'
//               className='delete-item-button' />
//           </div>
//         ))}
//       </div>

//       <div className="material-form">
//         <Input
//           label="Внутреннее имя"
//           value={form.name}
//           id='inner-name'
//           className='input-settings'
//           onChange={(e) => handleFormChange('name', e.target.value)}
//         />
        
//         <Input
//           label="Название"
//           value={form.description}
//           id='description'
//           className='input-settings'
//           onChange={(e) => handleFormChange('description', e.target.value)}
//         />

//         <TextArea
//           label="Размеры"
//           value={sizeText}
//           onChange={handleSizeChange}
//           rows={5}
//           id='size-textarea'
//           className='textarea-settings'
//         />

//         <Select
//           label="Тип"
//           id='type-select'
//           className='select-settings'
//           containerClassName='select-container'
//           value={form.type}
//           options={materialTypes}
//           onChange={(e) => handleFormChange('type', e.target.value)}
//         />

//         <Button 
//           onClick={handleSave} 
//           id='save' 
//           className='save-button'
//           name={selectedIndex === null ? 'ДОБАВИТЬ' : 'СОХРАНИТЬ'} 
//         />

//         <div className="oversize-container">
//           <div className='form-size-container'>
//             <p className='oversize-title'>Размер подворота</p>
//             <div className="input-oversize">
//               <Input
//                 label=""
//                 value={underside}
//                 id='underside'
//                 className='input-settings'
//                 onChange={(e) => setUnderside(e.target.value)}
//               />

//               <Button 
//                 onClick={handleSaveSize} 
//                 id='set-underside' 
//                 className='set-oversize-button'
//                 name='СОХРАНИТЬ' 
//               />
//             </div>
//           </div>

//           <div className='form-size-container'>
//             <p className='oversize-title'>Размер кармана</p>
//             <div className="input-oversize">
//               <Input
//                 label=""
//                 value={pocket}
//                 id='pocket'
//                 className='input-settings'
//                 onChange={(e) => setPocket(e.target.value)}
//               />

//               <Button 
//                 onClick={handleSaveSize} 
//                 id='set-pocket' 
//                 className='set-oversize-button'
//                 name='СОХРАНИТЬ' 
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Settings;
