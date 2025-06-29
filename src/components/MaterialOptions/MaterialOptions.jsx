import BannerVariation from "../BannerVariation/BannerVariation";
import CanvasVariation from "../CanvasVariation/CanvasVariation";
import Checkbox1440 from "../Checkbox1440/Checkbox1440";
import PropTypes from "prop-types";

import './MaterialOptions.css';

function MaterialOptions({ 
        isBanner, 
        isCanvas, 
        keyGroup, 
        checkboxState, 
        activeGroup,
        onCheckboxChange,
        onRadioChange, 
        onCanvasCheckboxChange, 
        isStandard, 
        onStandardChange, 
        onCheckbox1440Change, 
        checkbox1440State, 
    }) {

    return (
        <>
            {isBanner && (
                <div className="variation-container banner-options">
                    <BannerVariation
                        keyGroup={keyGroup}
                        checkboxState={checkboxState}
                        activeGroup={activeGroup}
                        onCheckboxChange={onCheckboxChange}
                        onRadioChange={onRadioChange}
                    />

                    <div className="divider"></div>
                    
                    <Checkbox1440
                        checked={checkbox1440State}
                        onChange={onCheckbox1440Change}
                    />
                </div>
            )}

            {isCanvas && (
                <div className="variation-container canvas-options">
                    <CanvasVariation
                        onChange={onCanvasCheckboxChange}
                        isStandardChecked={isStandard}
                        onStandardCheckboxChange={onStandardChange}
                    />
                </div>
            )} 
        </>
    );
}

MaterialOptions.propTypes = {
    isBanner: PropTypes.bool,
    isCanvas: PropTypes.bool,
    keyGroup: PropTypes.any,
    checkboxState: PropTypes.any,
    activeGroup: PropTypes.any,
    onCheckboxChange: PropTypes.func,
    onRadioChange: PropTypes.func,
    onCanvasCheckboxChange: PropTypes.func,
    isStandard: PropTypes.bool,
    onStandardChange: PropTypes.func,
    onCheckbox1440Change: PropTypes.func,
    checkbox1440State: PropTypes.any,
};

export default MaterialOptions;