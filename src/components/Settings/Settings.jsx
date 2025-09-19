import { useEffect, useState } from 'react';

import MaterialList from './MaterialList/MaterialList';
import MaterialForm from './MaterialForm/MaterialForm';
import Modal from '../Common/Modal/Modal';
import DeleteModal from './DeleteModal/DeleteModal';
import SaveModal from './SaveModal/SaveModal';

import useModal from '../../hooks/useModal';

import './Settings.css';

const materialTypes = [
  { name: 'banner', description: 'баннер' },
  { name: 'vinyl', description: 'пленка' },
  { name: 'paper', description: 'бумага' },
  { name: 'canvas', description: 'холст' }
];

const initialFormState = {
  name: '',
  description: '',
  size: [],
  type: 'banner',
};

function Settings() {
  const [data, setData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [sizeText, setSizeText] = useState('');
  const [underside, setUnderside] = useState('');
  const [pocket, setPocket] = useState('');
  const [modal, setModal] = useState({ type: null, index: null });

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

  const resetForm = () => {
    setForm(initialFormState);
    setSizeText('');
  };

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

  const handleNewMaterial = () => {
    resetForm();
    setSelectedIndex(null);
  };

  const handleSave = () => {
    setModal({ type: 'save' });
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
    resetForm();
    setSelectedIndex(null);
    closeModal();
  };

  const handleDeleteClick = (index) => {
    setModal({ type: 'delete', index });
    openModal();
  };

  const confirmDelete = () => {
    if (modal.index !== null) {
      setData((prev) => prev.filter((_, i) => i !== modal.index));
      resetForm();
      setSelectedIndex(null);
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
        selectedIndex={selectedIndex}
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
        {modal.type === 'delete' && (
          <DeleteModal
            material={data[modal.index]}
            onConfirm={confirmDelete}
            onCancel={closeModal}
          />
        )}

        {modal.type === 'save' && (
          <SaveModal form={form} onConfirm={confirmSave} onCancel={closeModal} />
        )}
      </Modal>
    </div>
  );
}

export default Settings;
