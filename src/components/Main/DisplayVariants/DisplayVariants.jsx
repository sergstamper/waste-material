import PropTypes from 'prop-types';

import './DisplayVariants.css';

function DisplayVariants({ wasteArr, className, title, imgSrc }) {
    return (
        <div className={className}>
            <div className="disp-title">
                <img src={imgSrc} alt={title} />
                <h2>{title}</h2>
            </div>
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

DisplayVariants.propTypes = {
    wasteArr: PropTypes.arrayOf(
        PropTypes.shape({
            waste: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            repeat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        })
    ).isRequired,
    className: PropTypes.string,
    title: PropTypes.string,
    imgSrc: PropTypes.string
};

export default DisplayVariants;