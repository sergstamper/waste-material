import PropTypes from 'prop-types';

import './Input.css';

function Input({ 
    value, 
    onChange, 
    id, 
    label, 
    className 
  }) {
  return (
    <div className='input-container'>
      <label htmlFor={id}>{label}</label>
      <input
        className={`input-field ${className}`}
        type="text"
        value={value}
        onChange={onChange}
        id={id}
      />
    </div>
  );
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Input;