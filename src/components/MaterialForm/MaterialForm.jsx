import Input from '../Input/Input';
import TextArea from '../TextArea/TextArea';
import Select from '../Select/Select';
import Button from '../Button/Button';
import InputOversize from '../InputOversize/InputOversize';

import './MaterialForm.css';

function MaterialForm({
    value,
    sizeValue,
    options,
    onInnNameChange, 
    onDescChange, 
    onSizeChange,
    onSelChange,
    onClick,
    isDisabled,
    selectedIndex,
    undersideValue,
    pocketValue,
    onUndersideChange,
    onPocketChange,
    onSaveSize,
}) {
    return (
        <div className="material-form">
            <Input
                label="Внутреннее имя"
                value={value.name}
                id="inner-name"
                className="input-settings"
                onChange={onInnNameChange}
            />

            <Input
                label="Название"
                value={value.description}
                id="description"
                className="input-settings"
                onChange={onDescChange}
            />

            <TextArea
                label="Размеры"
                value={sizeValue}
                onChange={onSizeChange}
                rows={5}
                id="size-textarea"
                className="textarea-settings"
            />

            <Select
                label="Тип"
                id="type-select"
                className="select-settings"
                containerClassName="select-container"
                value={value.type}
                options={options}
                onChange={onSelChange}
            />

            <Button
                onClick={onClick}
                id="save"
                className={isDisabled ? 'save-button disabled' : 'save-button'}
                name={selectedIndex === null ? 'ДОБАВИТЬ' : 'СОХРАНИТЬ'}
                disabled={isDisabled}
            />

            <div className="oversize-container">
                <InputOversize 
                    title="Размер подворота"
                    value={undersideValue}
                    id="underside"
                    btnId="set-underside"
                    onChange={onUndersideChange}
                    onClick={onSaveSize}
                />
                
                <InputOversize 
                    title="Размер кармана"
                    value={pocketValue}
                    id="pocket"
                    btnId="set-pocket"
                    onChange={onPocketChange}
                    onClick={onSaveSize}
                />
            </div>
        </div>
    );
}

import PropTypes from 'prop-types';

MaterialForm.propTypes = {
    value: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        type: PropTypes.string,
    }).isRequired,
    sizeValue: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onInnNameChange: PropTypes.func.isRequired,
    onDescChange: PropTypes.func.isRequired,
    onSizeChange: PropTypes.func.isRequired,
    onSelChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    selectedIndex: PropTypes.number,
    undersideValue: PropTypes.string.isRequired,
    pocketValue: PropTypes.string.isRequired,
    onUndersideChange: PropTypes.func.isRequired,
    onPocketChange: PropTypes.func.isRequired,
    onSaveSize: PropTypes.func.isRequired,
};

export default MaterialForm;