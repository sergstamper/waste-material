function Message({ result, done }) {
    const { wasteMsg, minWasteMsg, tip } = result;

    return (
        <div className="message">
            <p>{minWasteMsg}</p>
            <p>{tip || null}</p>
        </div>
    );
}

export default Message;