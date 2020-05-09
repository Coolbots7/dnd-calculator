import React from 'react';
import './TextBox.scss';
import PropTypes from 'prop-types';

const TextBox = (props) => {
    const { text } = props;

    return (
        <div className="calculator-text-box d-flex justify-content-center align-items-center">
            {text}
        </div>
    )
}

TextBox.propTypes = {
    text: PropTypes.string.isRequired
}

export default TextBox;