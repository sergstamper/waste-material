import Button from '../Button/Button';
import './ButtonsBlock.css';

function ButtonsBlock({ onReset, onCalculate }) {
    return (
        <div className="buttons-block">
            <Button onClick={onReset} id='reset' className="button-reset" name="СБРОС" />
            <Button onClick={onCalculate} id='calculate' className="button-calc" name="РАССЧИТАТЬ" />
        </div>
    );
}

export default ButtonsBlock;
