import React from 'react';
import PropTypes from 'prop-types';
import Character from '../Character';
import CharacterAdd from '../CharacterAdd';
import CharacterModal from '../CharacterModal';
import { getCharacters, addCharacter, removeCharacter, updateCharacter } from '../../utils/character-util';

// const characters = [
//     {
//         "name": "Ruven Daelana",
//         "modifiers": {
//             "strength": 1,
//             "dexterity": 2,
//             "constitution": 1,
//             "intelligence": 2,
//             "wisdom": 1,
//             "charisma": 1,
//             "proficiency": 2
//         }
//     },

//     {
//         "name": "egg",
//         "modifiers": {
//             "strength": 2,
//             "dexterity": 2,
//             "constitution": 0,
//             "intelligence": 2,
//             "wisdom": 1,
//             "charisma": -1,
//             "proficiency": 2
//         }
//     }
// ];

class CharacterList extends React.Component {
    static propTypes = {
        characterSelectedCallback: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            characters: [],
            selectedCharacter: null,
            showCharacterModal: false,
            editCharacter: null
        }

        this.onModalClose = this.onModalClose.bind(this);
        this.onCharacterAddClick = this.onCharacterAddClick.bind(this);
        this.onCharacterSelectClick = this.onCharacterSelectClick.bind(this);
        this.onCharacterEditClick = this.onCharacterEditClick.bind(this);
        this.onCharacterAdded = this.onCharacterAdded.bind(this);
        this.onCharacterEdited = this.onCharacterEdited.bind(this);
        this.onCharacterDeleted = this.onCharacterDeleted.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.update();
    }

    onModalClose() {
        this.setState({
            showCharacterModal: false,
            editCharacter: null
        });
    }

    onCharacterAddClick() {
        this.setState({
            showCharacterModal: true
        });
    }

    onCharacterSelectClick(character) {
        const { characterSelectedCallback } = this.props;
        characterSelectedCallback(character);

        this.setState({
            // selectedCharacter: character
            selectedCharacter: character.name
        });
    }

    onCharacterEditClick(character) {
        this.setState({
            showCharacterModal: true,
            editCharacter: character
        });
    }

    onCharacterAdded(character) {
        addCharacter(character);
        this.update();
    }

    onCharacterEdited(character, newCharacter) {
        updateCharacter(character, newCharacter);
        this.update();
    }

    onCharacterDeleted(character) {
        removeCharacter(character);
        this.update();
    }

    update() {
        const { characterSelectedCallback } = this.props;
        const { selectedCharacter } = this.state;

        //load characters from local storage
        const characters = getCharacters();

        //If only one character, automatically select it
        var selected_character = null
        if (characters.length === 1 && !selectedCharacter) {
            selected_character = characters[0];
            characterSelectedCallback(selected_character);
        }
        else if (selectedCharacter) {
            selected_character = characters.find(c => c.name === selectedCharacter);
            characterSelectedCallback(selected_character);
        }

        this.setState({
            characters,
            // selectedCharacter: selected_character
            selectedCharacter: selected_character ? selected_character.name : null
        });
    }

    render() {
        const { characters, showCharacterModal, editCharacter } = this.state;

        return (
            <div className="h-100 d-flex flex-column align-items-center py-5">
                {characters.map((character) => (
                    <Character key={character.name} character={character} onCharacterSelect={this.onCharacterSelectClick} onCharacterEdit={this.onCharacterEditClick} />
                ))}

                <CharacterAdd onClick={() => { this.onCharacterAddClick() }} />

                <CharacterModal show={showCharacterModal} character={editCharacter} onModalClose={this.onModalClose} onCharacterAdded={this.onCharacterAdded} onCharacterEdited={this.onCharacterEdited} onCharacterDeleted={this.onCharacterDeleted} />
            </div>
        );
    }
}

export default CharacterList;