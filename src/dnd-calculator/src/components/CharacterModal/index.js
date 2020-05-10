import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'

class CharacterModal extends React.Component {
    static propTypes = {
        show: PropTypes.bool.isRequired,
        character: PropTypes.object,
        onModalClose: PropTypes.func,
        onCharacterAdded: PropTypes.func,
        onCharacterEdited: PropTypes.func,
        onCharacterDeleted: PropTypes.func
    }

    static defaultProps = {
        character: null,
        onModalClose: null
    }

    constructor(props) {
        super(props);

        this.state = {
            showCharacterModal: false,
            character: null,
            validated: false
        };

        this.show = false;
        this.character = null;

        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    componentDidUpdate() {
        const { show, character } = this.props;

        if (show !== this.show) {
            this.show = show;
            this.setState({
                showCharacterModal: show
            });
        }

        if (character !== this.character) {
            this.character = character;
            this.setState({
                character: character,
                validated: false
            });
        }

    }

    handleModalClose() {
        const { onModalClose } = this.props;

        if (onModalClose) {
            onModalClose();
        }

        this.setState({
            showCharacterModal: false,
            validated: false
        });
    }

    handleFormSubmit(event) {
        const form = event.currentTarget;
        event.preventDefault();

        const { character } = this.state;
        const { onCharacterAdded, onCharacterEdited } = this.props;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            var newCharacter = {
                "name": form.name.value,
                "modifiers": {
                    "strength": form.strength.value,
                    "dexterity": form.dexterity.value,
                    "constitution": form.constitution.value,
                    "intelligence": form.intelligence.value,
                    "wisdom": form.wisdom.value,
                    "charisma": form.charisma.value,
                    "proficiency": form.proficiency.value,
                    "inspiration": form.inspiration.value
                }
            };

            if (character) {
                //edit
                
                //make sure name is not edited
                newCharacter.name = character.name;
                
                if (onCharacterEdited) {
                    onCharacterEdited(character, newCharacter);
                }
            }
            else {
                //add
                if (onCharacterAdded) {
                    onCharacterAdded(newCharacter);
                }
            }

            this.handleModalClose();
        }

        this.setState({
            validated: true
        });
    }

    onDeleteClick() {
        const { onCharacterDeleted } = this.props;
        const { character } = this.state;

        if (onCharacterDeleted) {
            onCharacterDeleted(character);
        }

        this.handleModalClose();
    }

    render() {
        const { showCharacterModal, character, validated } = this.state;

        return (
            <Modal show={showCharacterModal} onHide={this.handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{character ? 'Edit' : 'Add'} a Character</Modal.Title>
                </Modal.Header>

                <Form noValidate validated={validated} onSubmit={this.handleFormSubmit} >
                    <Modal.Body>
                        <div className="form-row">
                            <div className="col">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" defaultValue={character ? character.name : ''} name="name" placeholder="Name your character" required disabled={character !== null} />
                                    <div className="valid-feedback">
                                        Looks good!
                                        </div>
                                    <div className="invalid-feedback">
                                        Please enter a Name.
                                        </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col">
                                <div className="form-group">
                                    <label>Strength</label>
                                    <input type="number" step="1" min="-10" max="10" className="form-control" name="strength" defaultValue={character ? character.modifiers.strength : null} required />
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                    <div className="invalid-feedback">
                                        Please enter strength modifier.
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label>Dexterity</label>
                                    <input type="number" step="1" min="-10" max="10" className="form-control" name="dexterity" defaultValue={character ? character.modifiers.dexterity : null} required />
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                    <div className="invalid-feedback">
                                        Please enter dexterity modifier.
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label>Constitution</label>
                                    <input type="number" step="1" min="-10" max="10" className="form-control" name="constitution" defaultValue={character ? character.modifiers.constitution : null} required />
                                    <div className="valid-feedback">
                                        Looks good!
                                        </div>
                                    <div className="invalid-feedback">
                                        Please enter constitution modifier.
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label>Intelligence</label>
                                    <input type="number" step="1" min="-10" max="10" className="form-control" name="intelligence" defaultValue={character ? character.modifiers.intelligence : null} required />
                                    <div className="valid-feedback">
                                        Looks good!
                                        </div>
                                    <div className="invalid-feedback">
                                        Please enter intelligence modifier.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col">
                                <div className="form-group">
                                    <label>Wisdom</label>
                                    <input type="number" step="1" min="-10" max="10" className="form-control" name="wisdom" defaultValue={character ? character.modifiers.wisdom : null} required />
                                    <div className="valid-feedback">
                                        Looks good!
                                        </div>
                                    <div className="invalid-feedback">
                                        Please enter wisdom modifier.
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label>Charisma</label>
                                    <input type="number" step="1" min="-10" max="10" className="form-control" name="charisma" defaultValue={character ? character.modifiers.charisma : null} required />
                                    <div className="valid-feedback">
                                        Looks good!
                                        </div>
                                    <div className="invalid-feedback">
                                        Please enter charisma modifier.
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label>Proficiency</label>
                                    <input type="number" step="1" min="-10" max="10" className="form-control" name="proficiency" defaultValue={character ? character.modifiers.proficiency : null} required />
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                    <div className="invalid-feedback">
                                        Please enter proficiency modifier.
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label>Inspiration</label>
                                    <input type="number" step="1" min="-10" max="10" className="form-control" name="inspiration" defaultValue={character ? character.modifiers.inspiration : null} required />
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                    <div className="invalid-feedback">
                                        Please enter proficiency modifier.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        {!character &&
                            <>
                                <button type="button" className="btn btn-secondary" onClick={this.handleModalClose}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Add</button>
                            </>
                        }

                        {character &&
                            <>
                                <button type="button" className="btn btn-outline-danger mr-auto" onClick={this.onDeleteClick}>Delete</button>
                                <button type="button" className="btn btn-secondary" onClick={this.handleModalClose}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </>
                        }
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}

export default CharacterModal;