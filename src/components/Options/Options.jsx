import PropTypes from 'prop-types';

import './Options.css';

function Options({ materials, onChange, currentMaterial }) {

  return (
    <div>
      <div className='select-material'>
          <label htmlFor="options">Материал</label>
          <select 
            onChange={onChange} 
            className="options" 
            type="text" 
            id="options"
            value={currentMaterial?.name}
          >
              {materials.map((material, index) => (
                  <option key={index} value={material.name}>{material.description}</option>
              ))}
          </select>
      </div>
    </div>
  );
}

Options.propTypes = {
  materials: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  currentMaterial: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default Options;