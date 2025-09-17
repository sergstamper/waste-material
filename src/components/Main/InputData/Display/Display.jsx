import PropTypes from 'prop-types';

import './Display.css';

function Display({sizes}) {
    return (
        <div className="display">
            <div>
                <p>Размеры</p>
                <ul className='sizes'>
                    {sizes && sizes.map((size, index) => (
                        <li key={index}>{size}</li>
                    ))}
                </ul>
            </div>
            <div>
                <p>Запечатка</p>
                <ul className='sizes'>
                    {sizes && sizes.map((size, index) => (
                        <li key={index}>{size-20}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
};

Display.propTypes = {
    sizes: PropTypes.arrayOf(PropTypes.string),
}

export default Display;