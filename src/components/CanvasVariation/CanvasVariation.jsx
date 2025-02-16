import './CanvasVariation.css';

function CanvasVariation( { isCanvas, onChange, isStandardChecked, onStandardCheckboxChange } ) {
    const appearance = isCanvas ? 'container' : 'hidden';

    return (
        <div className={appearance}>
            <label>
                <input 
                    type="radio" 
                    name="canvas-option" 
                    value="zero" 
                    onChange={onChange} />
                Без полей
            </label>
            <label>
                <input 
                    type="radio" 
                    name="canvas-option" 
                    value="15x30" 
                    onChange={onChange} />
                15x30
            </label>
            <label>
                <input 
                    type="radio" 
                    name="canvas-option" 
                    value="17x45" 
                    onChange={onChange} />
                17x45
            </label>
            <label>
                <input 
                    type="radio" 
                    name="canvas-option" 
                    value="23x45" 
                    onChange={onChange} />
                23x45
            </label>
            <label>
                <input 
                    type="checkbox" 
                    name="standart" 
                    value="standart" 
                    checked={isStandardChecked} 
                    onChange={onStandardCheckboxChange}  />
                Стандартная натяжка
            </label>
        </div>
    )
}

export default CanvasVariation;