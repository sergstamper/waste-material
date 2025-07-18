import './CanvasVariation.css';

function CanvasVariation( { isCanvas, onChange, isStandardChecked, onStandardCheckboxChange } ) {
    // const appearance = isCanvas ? 'container' : 'hidden';

    return (
        <div className="container">
            <div className="group">
                <input
                    id="wo-fields" 
                    type="radio" 
                    name="canvas-option" 
                    value="zero" 
                    onChange={onChange} />
                <label htmlFor="wo-fields">Без полей</label>
            </div>

            <div className="group">
                <input
                    id="15-30" 
                    type="radio" 
                    name="canvas-option" 
                    value="15x30" 
                    onChange={onChange} />
                <label htmlFor="15-30">15×30</label>
            </div>

            <div className="group">
                <input
                    id="17-45" 
                    type="radio" 
                    name="canvas-option" 
                    value="17x45" 
                    onChange={onChange} />
                <label htmlFor="17-45">17×45</label>
            </div>

            <div className="group">
                <input
                    id="23-45" 
                    type="radio" 
                    name="canvas-option" 
                    value="23x45" 
                    onChange={onChange} />
                <label htmlFor="23-45">23×45</label>
            </div>

            <div className="group">
                <input
                    id="" 
                    type="checkbox" 
                    name="standart" 
                    value="standart" 
                    checked={isStandardChecked} 
                    onChange={onStandardCheckboxChange}  />
                <label htmlFor="standard">Стандартная натяжка</label>
            </div>
        </div>
    )
}

export default CanvasVariation;