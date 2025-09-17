import PropTypes from 'prop-types';

import './Select.css';

function Select({ 
    label, 
    id, 
    className, 
    containerClassName, 
    value, 
    options, 
    onChange 
  }) {
  return (
    <div>
      <div className={`select-container ${containerClassName}`}>
          <label htmlFor={id}>{label}</label>
          <select 
            onChange={onChange} 
            className={`select-field ${className}`} 
            type="text" 
            id={id}
            value={value}
          >
              {options.map((material, index) => (
                  <option key={index} value={material.name}>
                    {material.description}
                  </option>
              ))}
          </select>
      </div>
    </div>
  );
}

Select.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;