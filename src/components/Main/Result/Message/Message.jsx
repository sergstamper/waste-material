import PropTypes from 'prop-types';

import './Message.css';

function Message({ result }) {
    const { wasteMsg, minWasteMsg, tip } = result;

    return (
        <div className="message">
            <p className="waste">{wasteMsg || null}</p>
            <p>{minWasteMsg || null}</p>
            <p>{tip || null}</p>
        </div>
    );
}

Message.propTypes = {
    result: PropTypes.shape({
        wasteMsg: PropTypes.string,
        minWasteMsg: PropTypes.string,
        tip: PropTypes.string,
    }).isRequired,
};

export default Message;
