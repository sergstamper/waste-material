import PropTypes from "prop-types";

import Input from "../../../Common/Input/Input";
import Button from "../../../Common/Button/Button";

import "./InputOversize.css";

function InputOversize({ 
        title, 
        value, 
        id, 
        btnId, 
        onChange, 
        onClick 
    }) {
    return (
        <div className="form-size-container">
            <p className="oversize-title">{title}</p>
            <div className="input-oversize">
                <Input
                    label=""
                    value={value}
                    id={id}
                    className="input-settings"
                    onChange={onChange}
                />

                <Button
                    onClick={onClick}
                    id={btnId}
                    className="set-oversize-button"
                    name="СОХРАНИТЬ"
                />
            </div>
        </div>
    );
}

InputOversize.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id: PropTypes.string,
    btnId: PropTypes.string,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
};

export default InputOversize;
