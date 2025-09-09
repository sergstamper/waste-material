import PropTypes from 'prop-types';

function RadioButton({ id, name, value, checked, onChange, label }) {
    return (
        <div className="group">
            <input
                id={id} 
                type="radio" 
                name={name} 
                value={value} 
                checked={checked}
                onChange={onChange} />
            <label htmlFor={id}>{label}</label>
        </div>
    )
}

RadioButton.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.node.isRequired,
};

export default RadioButton;