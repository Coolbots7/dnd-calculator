import React from 'react';
import './Character.scss';
import PropTypes from 'prop-types';

const Character = (props) => {
    const { character, onCharacterSelect, onCharacterEdit } = props;

    return (
        <div className="character mb-3">
            <div className="d-flex flex-row h-100">
                <div className="my-auto ml-3">
                    {/* picture */}
                    <div style={{position: 'relative'}}>
                        <img src={character.image || "https://via.placeholder.com/150"} className="character-image" alt="..."></img>

                        <div className="character-fab character-select" onClick={() => { onCharacterSelect(character) }}>
                            <i className="fas fa-check"></i>
                        </div>
                        <div className="character-fab character-edit" onClick={() => { onCharacterEdit(character) }}>
                            <i className="far fa-edit"></i>
                        </div>
                    </div>
                </div>
                <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                    {/* details */}
                    <span>{character.name}</span>

                    <div className="d-flex flex-row justify-content-around mt-1" style={{ width: '85%' }}>
                        {/* modifiers */}
                        <Modifier modifier="STR" value={character.modifiers.strength} />
                        <Modifier modifier="DEX" value={character.modifiers.dexterity} />
                        <Modifier modifier="CON" value={character.modifiers.constitution} />
                        <Modifier modifier="INT" value={character.modifiers.intelligence} />
                        <Modifier modifier="WIS" value={character.modifiers.wisdom} />
                        <Modifier modifier="CHA" value={character.modifiers.charisma} />
                        <Modifier modifier="PRO" value={character.modifiers.proficiency} />
                    </div>
                </div>
            </div>
        </div>
    );
};

Character.propTypes = {
    character: PropTypes.object.isRequired,
    onCharacterSelect: PropTypes.func.isRequired,
    onCharacterEdit: PropTypes.func.isRequired
}

const Modifier = (props) => {
    const { modifier, value } = props;

    return (
        <div className="d-flex flex-column text-center">
            <span className="modifier-title">{modifier}</span>
            <span className="modifier-value">{value > 0 ? `+${value}` : value}</span>
        </div>
    );
}

Modifier.propTypes = {
    modifier: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
}

export default Character;