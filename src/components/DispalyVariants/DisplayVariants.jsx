import PropTypes from 'prop-types';

function DispalyVariants({ wasteArr, className, title }) {
    return (
        <div className={className}>
            <h2>{title}</h2>
            <ul>
                {wasteArr.length > 0 ? (
                    wasteArr.map((item, index) => {
                        const partText = item.repeat % 10 === 1 && item.repeat !== 11 
                            ? 'части' 
                            : 'частей';
                    
                        return (
                            <li key={index}>
                                Отход: <strong>{item.waste}</strong> м² из <strong>{item.repeat}</strong> {partText} на материале <strong>{item.size}</strong> мм.
                            </li>
                        )
                    })
                ) : (
                    <li>Нет вариантов</li>
                )}
            </ul>
        </div>
    );
}

DispalyVariants.propTypes = {
    wasteArr: PropTypes.arrayOf(
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