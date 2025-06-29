function ResButtons({ onClick, name, id, btnClass }) {
    return (
        <div className="res-buttons">
            <button className="btn btn-primary" onClick={onClick} name={name} id={id} className={btnClass}>Button 1</button>
            <button className="btn btn-secondary" onClick={onClick} name={name} id={id} className={btnClass}>Button 2</button>
        </div>
    );
}

export default ResButtons;