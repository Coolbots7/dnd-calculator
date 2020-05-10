import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

const ModifierButton = (props) => {
    const { modifier, value, onClick } = props;

    return (
        <Button text={<div className="d-flex flex-column text-center"><span>{modifier}</span><span>{value > 0 ? `+${value}` : value}</span></div>} onClick={onClick} />
    );
}

ModifierButton.propTypes = {
    modifier: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default ModifierButton;