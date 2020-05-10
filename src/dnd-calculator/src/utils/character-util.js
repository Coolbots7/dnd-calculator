const charactersKey = "characters";

function getCharacters() {
    return JSON.parse(localStorage.getItem(charactersKey)) || [];
}

function updateCharacter(oldCharacter, newCharacter) {
    removeCharacter(oldCharacter);
    addCharacter(newCharacter);
}

function addCharacter(character) {
    //get existing characters
    var characters = getCharacters();

    //push new character
    characters.push(character);

    //store new characters array
    setCharacters(characters);
}

function removeCharacter(character) {
    //get existing characters
    var characters = getCharacters();

    //find and remove character
    // characters = characters.filter(c => c !== character);
    characters = characters.filter(c => c.name !== character.name);

    //store new characters array
    setCharacters(characters);
}

function setCharacters(characters) {
    localStorage.setItem(charactersKey, JSON.stringify(characters));
}

export { getCharacters, addCharacter, removeCharacter, updateCharacter };