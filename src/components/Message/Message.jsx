import './Message.css';

function Message({ result, done }) {
    const { wasteMsg, minWasteMsg, tip } = result;

    return (
        <div className="message">
            <p className="waste">{wasteMsg || ''}</p>
            <p>{minWasteMsg}</p>
            <p>{tip || null}</p>
        </div>
    );
}

export default Message;