import React from 'react';
import './Button.scss';
import PropTypes from 'prop-types';

const Button = (props) => {
    const { text, onClick } = props;

    return (
        <div className="calculator-button d-flex justify-content-center align-items-center" onClick={onClick}>
            {text}
        </div>
    )
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Button;