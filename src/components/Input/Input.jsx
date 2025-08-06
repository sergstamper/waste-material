import './Input.css';
import PropTypes from 'prop-types';

function Input({ value, onChange, id, label, className }) {
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
  label: PropTypes.string.isRequired
};

export default Input;