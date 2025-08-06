import './Button.css';
import PropTypes from 'prop-types';

function Button({ onClick, name, id, className }) {
  return (
    <button 
      onClick={onClick} 
      id={id} 
      className={`btn ${className}`}
    >
      {name}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string
};

export default Button;