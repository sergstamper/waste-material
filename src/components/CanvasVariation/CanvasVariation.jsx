import './CanvasVariation.css';

function CanvasVariation( { isCanvas } ) {
    const appearance = isCanvas ? 'container' : 'hidden';

    return (
        <div className={appearance}>
            <label>
                <input type="radio" name="option" value="zero" checked />
                Без полей
            </label>
            <label>
                <input type="radio" name="option" value="15x30" />
                15x30
            </label>
            <label>
                <input type="radio" name="option" value="17x45" />
                17x45
            </label>
            <label>
                <input type="radio" name="option" value="23x45" />
                23x45
            </label>
            <label>
                <input type="checkbox" name="standart" value="standart" />
                Стандартная натяжка
            </label>
        </div>
    )
}

export default CanvasVariation;