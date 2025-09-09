import PropTypes from 'prop-types';
import Button from '../Button/Button';

import './MaterialList.css';

export const MaterialList = ({ data, onNewClick, onSelectClick, onDeleteClick }) => {
    return (
        <div className="material-list">
            <div className="material-item add" onClick={onNewClick}>
            <span>Добавить новый материал</span>
            <Button 
                onClick={onNewClick}
                id='add'
                className='add-material-button' />
            </div>
            {data.map((item, index) => (
            <div key={index} className="material-item">
                <span onClick={() => onSelectClick(index)}>{item.description}</span>
                <Button 
                onClick={() => onDeleteClick(index)}
                id='delete'
                className='delete-item-button' />
            </div>
            ))}
        </div>
    );

};
MaterialList.propTypes = {
    data: PropTypes.array.isRequired,
    onSelectClick: PropTypes.func.isRequired,
    onNewClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired
};

export default MaterialList;