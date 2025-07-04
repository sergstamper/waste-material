import Button from '../Button/Button';

import './ResButtons.css';

function ResButtons({ onClick }) {
    return (
        <div className="res-buttons">
            <Button onClick={onClick} name='ВАРИАНТЫ' id='options' className="res-btn button-data" />
            <Button onClick={onClick} name='КОПИРОВАТЬ' id='copy' className="res-btn button-copy" />
        </div>
    );
}

export default ResButtons;