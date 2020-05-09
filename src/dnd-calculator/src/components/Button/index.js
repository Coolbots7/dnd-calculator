import React from 'react';
import './Button.scss';
import PropTypes from 'prop-types';

const Button = (props) => {
    const { text, onClick, className, style } = props;

    return (
        <div className={`calculator-button d-flex justify-content-center align-items-center ${className}`} style={style} onClick={onClick}>
            {text}
        </div>
    )
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Button;