import './Checkbox1440.css';

function Checkbox1440({ checked, onChange }) {
  return (
    <div className="checkbox">
      <input
        type="checkbox"
        id="checkbox-1440"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor="checkbox-1440">Печать <br /> 1440 dpi</label>
    </div>
  );
}

export default Checkbox1440;
