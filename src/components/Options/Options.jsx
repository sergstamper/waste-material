import PropTypes from 'prop-types';

function Options({ materials, onChange }) {
  return (
    <div>
      <div className='select'>
          <label htmlFor="options">Материал</label>
          <select onChange={onChange} className="options" type="text" id="options">
              {materials.map((material, index) => (
                  <option key={index} value={material.name}>{material.name}</option>
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
};

export default Options;