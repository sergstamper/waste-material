import { useState } from 'react';

const initialFormState = {
  name: '',
  description: '',
  size: [],
  type: 'banner',
};

export default function useMaterialForm() {
  const [form, setForm] = useState(initialFormState);
  const [sizeText, setSizeText] = useState('');

  const resetForm = () => {
    setForm(initialFormState);
    setSizeText('');
  };

  const handleChange = (key, value) => {
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

  return {
    form,
    setForm,
    sizeText,
    setSizeText,
    resetForm,
    handleChange,
    handleSizeChange,
  };
}
