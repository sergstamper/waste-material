import PropTypes from 'prop-types';

function DispalyVariants({ waste, className, title }) {
    return (
        <div className={className}>
        <h2>{title}</h2>
        <ul>
            {waste.map((item, index) => (
            <li key={index}>
                Отход: <strong>{item.waste}</strong> м² из <strong>{item.repeat}</strong> частей на материале <strong>{item.size}</strong> мм.
            </li>
            ))}
        </ul>
        </div>
    );
}

DispalyVariants.propTypes = {
    waste: PropTypes.arrayOf(
        PropTypes.shape({
            waste: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            repeat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        })
    ).isRequired,
    className: PropTypes.string,
    title: PropTypes.string
};

export default DispalyVariants;