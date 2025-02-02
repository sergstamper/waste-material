import PropTypes from 'prop-types';

function Display({sizes}) {
    return (
        <div>
            <h2>Display</h2>
            <ul>
                {sizes && sizes.map((size, index) => (
                    <li key={index}>{size}</li>
                ))}
            </ul>
            <ul>
                {sizes && sizes.map((size, index) => (
                    <li key={index}>{size-20}</li>
                ))}
            </ul>
        </div>
    )
};

Display.propTypes = {
    sizes: PropTypes.arrayOf(PropTypes.string),
}

export default Display;