import Button from '../Button/Button';
import './ButtonsBlock.css';

function ButtonsBlock({ onReset, onCalculate }) {
    return (
        <div className="buttons-block">
            <Button onClick={onReset} id='reset' name="СБРОС" />
            <Button onClick={onCalculate} id='calculate' name="РАССЧИТАТЬ" />
        </div>
    );
}

export default ButtonsBlock;
