import PropTypes from 'prop-types';
import './MaterialList.css';

import { Button } from './Button/Button';

export const MaterialList = ({ data, handleSelect, handleNewMaterial, handleDelete }) => {
    return (
        <div className="material-list">
            <div className="material-item add" onClick={handleNewMaterial}>
            <span>Добавить новый материал</span>
            <Button 
                onClick={handleNewMaterial}
                id='add'
                className='add-material-button' />
            </div>
            {data.map((item, index) => (
            <div key={index} className="material-item">
                <span onClick={() => handleSelect(index)}>{item.description}</span>
                <Button 
                onClick={() => handleDelete(index)}
                id='delete'
                className='delete-item-button' />
            </div>
            ))}
        </div>
    );

};
MaterialList.propTypes = {
    data: PropTypes.array.isRequired,
    handleSelect: PropTypes.func.isRequired,
    handleNewMaterial: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
};

export default MaterialList;