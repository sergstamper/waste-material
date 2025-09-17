import { useEffect, useState } from 'react';

import MaterialList from './MaterialList/MaterialList';
import MaterialForm from './MaterialForm/MaterialForm';
import useModal from '../hooks/useModal';
import Modal from '../Common/Modal/Modal';
import Button from '../Common/Button/Button';

import './Settings.css';

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
  const [deleteIndex, setDeleteIndex] = useState(null);
const [modalType, setModalType] = useState(null);

  const initialFormState = {
    name: '',
    description: '',
    size: [],
    type: 'banner',
  };

  const [form, setForm] = useState(initialFormState);

  const { isModalOpen, openModal, closeModal } = useModal();

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
    setModalType('save');
    openModal();
  };

  const confirmSave = () => {
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
    setModalType(null);
    closeModal();
  };

  const handleNewMaterial = () => {
    setSelectedIndex(null);
    setForm(initialFormState);
    setSizeText('');
  };

  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setModalType('delete');
    openModal();
};

  const handleDelete = () => {
    if (deleteIndex !== null) {
      const updatedData = data.filter((_, i) => i !== deleteIndex);
      setData(updatedData);
      setSelectedIndex(null);
      setForm(initialFormState);
      setSizeText('');
      setDeleteIndex(null);
      setModalType(null);
      closeModal();
    }
  };

  const handleSaveSize = () => {
    console.log(underside, pocket);
  };

  const isSaveDisabled =
    !form.name.trim() ||
    !form.description.trim() ||
    !sizeText.trim();

  return (
    <div className="settings">

      <MaterialList
        data={data}
        onNewClick={handleNewMaterial}
        onSelectClick={handleSelect}
        onDeleteClick={handleDeleteClick}
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

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalType === 'delete' && (
          <>
            <div className="info-block">
              <h2>
                Хотите удалить материал <br />
                <span className='material-name'>{data[deleteIndex]?.description}?</span>
              </h2>
            </div>
            <div className="cancel-button-container">
              <Button onClick={handleDelete} name="УДАЛИТЬ" className="modal-delete-button" />
              <Button onClick={closeModal} name="ОТМЕНИТЬ" className="modal-cancel-button" />
            </div>
          </>
        )}

        {modalType === 'save' && (
          <>
            <div className="info-block">
              <h2>
                Сохранить материал <br />
                <span className='material-name'>{form.description || 'Без названия'}</span>?
              </h2>
            </div>
            <div className="cancel-button-container">
              <Button onClick={confirmSave} name="СОХРАНИТЬ" className="modal-save-button" />
              <Button onClick={closeModal} name="ОТМЕНИТЬ" className="modal-nosave-button" />
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}

export default Settings;
