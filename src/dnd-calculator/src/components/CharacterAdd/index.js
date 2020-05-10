import React from 'react';
import PropTypes from 'prop-types';
import './CharacterAdd.scss';

const CharacterAdd = (props) => {
    const { onClick } = props;

    return (
        <div className="character character-add text-center d-flex justify-content-center align-items-center" onClick={onClick}>
            <div className="character-add-text"><i className="fas fa-plus"></i> Add a Character</div>
        </div>
    )
}

CharacterAdd.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default CharacterAdd;