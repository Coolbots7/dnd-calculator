import React from 'react';
import PropTypes from 'prop-types';
import './Calculator.scss';
import Button from '../Button';
import TextBox from '../TextBox';
import ModifierButton from '../ModifierButton';

const CalculatorState = {
    EMPTY: 1,
    FIRST_QUANTITY_DIE: 2,
    DIE_OR_MODIFIER: 3,
    QUANTITY_DIE: 4,
    MODIFIER: 5
};

const Die = {
    D4: 4,
    D6: 6,
    D8: 8,
    D10: 10,
    D12: 12,
    D20: 20,
    D100: 100
};

const Modifiers = {
    Strength: "STR",
    Dexterity: "DEX",
    Constitution: "CON",
    Intelligence: "INT",
    Wisdom: "WIS",
    Charisma: "CHA",
    Proficiency: "PRO",
    Initiative: "INI"
}

const SelectiveResults = {
    DropHighest: "- H",
    DropLowest: "- L"
}

function rollDie(die) {
    return Math.floor(Math.random() * die) + 1;
}

class Calculator extends React.Component {
    static propTypes = {
        character: PropTypes.object
    };

    static defaultProps = {
        character: null
    };

    constructor(props) {
        super(props);

        this.state = {
            expression: null,
            state: CalculatorState.EMPTY
        };

        this.getModifierValue = this.getModifierValue.bind(this);
        this.onQuantityButtonClick = this.onQuantityButtonClick.bind(this);
        this.onDieButtonClick = this.onDieButtonClick.bind(this);
        this.onModifierClick = this.onModifierClick.bind(this);
        this.onSelectiveResultsClick = this.onSelectiveResultsClick.bind(this);
        this.onRollClick = this.onRollClick.bind(this);
        this.onClearClick = this.onClearClick.bind(this);
    }

    getModifierValue(modifier) {
        const { character } = this.props;

        if (character) {
            const modifiers = character.modifiers;

            switch (modifier) {
                case Modifiers.Strength:
                    return modifiers.dexterity;
                case Modifiers.Dexterity:
                    return modifiers.strength;
                case Modifiers.Constitution:
                    return modifiers.constitution;
                case Modifiers.Intelligence:
                    return modifiers.intelligence;
                case Modifiers.Wisdom:
                    return modifiers.wisdom;
                case Modifiers.Charisma:
                    return modifiers.charisma;
                case Modifiers.Proficiency:
                    return modifiers.proficiency;
                default:
                    return 0;
            }
        }
        else {
            return 0;
        }
    }

    onQuantityButtonClick(quantity) {
        const { state, expression } = this.state;

        //check calculator state is ready for a new argument
        if (state === CalculatorState.EMPTY || state === CalculatorState.DIE_OR_MODIFIER) {
            //add quantity to expression

            var newExpression = "";
            var newState = null;

            //update calculator state to waiting for die
            if (state === CalculatorState.EMPTY) {
                newExpression = quantity;
                newState = CalculatorState.FIRST_QUANTITY_DIE;
            }
            else if (state === CalculatorState.DIE_OR_MODIFIER) {
                newExpression = expression + " + " + quantity;
                newState = CalculatorState.QUANTITY_DIE;
            }

            this.setState({
                expression: newExpression,
                state: newState
            });
        }
    }

    onDieButtonClick(die) {
        const { state, expression } = this.state;

        var newExpression = "";

        //check calculator state is ready for a die
        //if no quantity is entered default to 1
        if (state === CalculatorState.EMPTY || state === CalculatorState.DIE_OR_MODIFIER) {
            if (state === CalculatorState.EMPTY) {
                newExpression = "1d" + die;
            }
            else if (state === CalculatorState.DIE_OR_MODIFIER) {
                newExpression = expression + " + 1d" + die;
            }
        }
        else if (state === CalculatorState.FIRST_QUANTITY_DIE || state === CalculatorState.QUANTITY_DIE) {
            newExpression = expression + "d" + die;
        }

        this.setState({
            expression: newExpression,
            state: CalculatorState.DIE_OR_MODIFIER
        });
    }

    onModifierClick(modifier) {
        const { state, expression } = this.state;

        //check calculator state is ready for a modifier
        if (state === CalculatorState.DIE_OR_MODIFIER || state === CalculatorState.MODIFIER) {
            var newExpression = expression + " + " + modifier;

            this.setState({
                expression: newExpression,
                state: CalculatorState.MODIFIER
            });
        }
    }

    onSelectiveResultsClick(drop) {
        const { state, expression } = this.state;

        if (state === CalculatorState.DIE_OR_MODIFIER) {
            var newExpression = expression + " " + drop;

            this.setState({
                expression: newExpression,
                state: CalculatorState.DIE_OR_MODIFIER
            });
        }

    }

    onRollClick() {
        var { state, expression } = this.state;

        //check state is valid for roll
        if (state === CalculatorState.DIE_OR_MODIFIER || state === CalculatorState.MODIFIER) {
            //Remove all whitespace
            expression = expression.replace(/ /g, '');

            //split expression into arguments on +
            const args = expression.split(/[+|-]/g);

            var rollTotal = 0;
            var rollString = "";

            //for each argument
            for (var i = 0; i < args.length; i++) {
                const arg = args[i];

                //Test if argument is dice roll or modifier
                if (arg.match(/\d+d\d+/g)) {

                if (i > 0) {
                    rollString += " +";
                }

                    const dieRoll = arg.split("d");
                    const quantity = parseInt(dieRoll[0]);
                    const die = parseInt(dieRoll[1]);

                    if (quantity === 1) {
                        const rollValue = rollDie(die);
                        rollString += " " + rollValue;
                        rollTotal += parseInt(rollValue);
                    }
                    else {
                        rollString += " (";

                        for (var j = 0; j < quantity; j++) {
                            if (j > 0) {
                                rollString += " + ";
                            }

                            const rollValue = rollDie(die);
                            rollString += rollValue;
                            rollTotal += parseInt(rollValue);
                        }

                        rollString += ")";
                    }

                }
                //Text if argument is selective
                else if (arg.match(/^H$|^L$/g)) {

                    //get the most recent group of rolls from rollString
                    const groups = rollString.replace(/ /g, '').match(/\(([\d|+]+)\)/g);

                    //TODO a selective result could be added after a single die roll which will not be surrounded my parentheses
                    //maybe there is something better to do than just ignoring the selective result
                    if (groups != null && groups.length > 0) {
                        var group = groups[groups.length - 1];
                        group = group.replace(/[(|)]/g, '');

                        //split most recent group of rolls into array
                        const groupValues = group.split("+");

                        if (arg.match(/^H$/g)) {
                            //get hightest value from array and subtract
                            const highestValue = Math.max(...groupValues);

                            rollString += " - " + highestValue;
                            rollTotal -= parseInt(highestValue);
                        }
                        else if (arg.match(/^L$/g)) {
                            //get lowest value from array and subtract
                            const lowestValue = Math.min(...groupValues);

                            rollString += " - " + lowestValue;
                            rollTotal -= parseInt(lowestValue);
                        }
                    }
                }
                else {

                    if (i > 0) {
                        rollString += " +";
                    }

                    const modifier = this.getModifierValue(arg);
                    rollString += " " + modifier;
                    rollTotal += parseInt(modifier);
                }
            }

            rollString += " = " + rollTotal;

            //reset expression and state
            this.setState({
                expression: rollString,
                state: CalculatorState.EMPTY
            });
        }
    }

    onClearClick() {
        this.setState({
            state: CalculatorState.EMPTY,
            expression: null
        });
    }

    render() {
        const { expression } = this.state;
        const { character } = this.props;

        return (
            <div className="calculator">
                <div className="row">
                    {/* text box */}
                    <TextBox text={expression ? expression : ""} />
                </div>
                <div className="row mt-3 d-flex flex-row justify-content-between">
                    {/* quantity */}
                    <Button text='1' onClick={() => { this.onQuantityButtonClick(1); }} />
                    <Button text='2' onClick={() => { this.onQuantityButtonClick(2); }} />
                    <Button text='3' onClick={() => { this.onQuantityButtonClick(3); }} />
                    <Button text='4' onClick={() => { this.onQuantityButtonClick(4); }} />
                    <Button text='5' onClick={() => { this.onQuantityButtonClick(5); }} />
                </div>
                <div className="row">
                    {/* dropdown quantity */}
                </div>
                <div className="row mt-4 d-flex flex-row justify-content-between">
                    {/* dice */}
                    <Button text='d4' onClick={() => { this.onDieButtonClick(Die.D4); }} />
                    <Button text='d6' onClick={() => { this.onDieButtonClick(Die.D6); }} />
                    <Button text='d8' onClick={() => { this.onDieButtonClick(Die.D8); }} />
                    <Button text='d10' onClick={() => { this.onDieButtonClick(Die.D10); }} />
                    <Button text='d12' onClick={() => { this.onDieButtonClick(Die.D12); }} />
                </div>
                <div className="row mt-2 d-flex flex-row justify-content-around">
                    {/* dice */}
                    <Button text='d20' onClick={() => { this.onDieButtonClick(Die.D20); }} />
                    <Button text='d100' onClick={() => { this.onDieButtonClick(Die.D100); }} />
                </div>
                <div className="row mt-4 d-flex flex-row justify-content-around">
                    {/* selective results */}
                    <Button text='-H' onClick={() => { this.onSelectiveResultsClick(SelectiveResults.DropHighest); }} />
                    <Button text='-L' onClick={() => { this.onSelectiveResultsClick(SelectiveResults.DropLowest) }} />
                </div>
                {character &&
                    <>
                        <div className="row mt-4 d-flex justify-content-center text-white">
                            <span>{character.name}</span>
                        </div>
                        <div className="row mt-2 d-flex flex-row justify-content-around">
                            {/* modifiers */}
                            <ModifierButton modifier="STR" value={character.modifiers.strength} onClick={() => { this.onModifierClick(Modifiers.Strength); }} />
                            <ModifierButton modifier="DEX" value={character.modifiers.dexterity} onClick={() => { this.onModifierClick(Modifiers.Dexterity); }} />
                            <ModifierButton modifier="CON" value={character.modifiers.constitution} onClick={() => { this.onModifierClick(Modifiers.Constitution); }} />
                            <ModifierButton modifier="INT" value={character.modifiers.intelligence} onClick={() => { this.onModifierClick(Modifiers.Intelligence); }} />
                            <ModifierButton modifier="WIS" value={character.modifiers.wisdom} onClick={() => { this.onModifierClick(Modifiers.Wisdom); }} />
                        </div>
                        <div className="row mt-2 d-flex flex-row justify-content-around">
                            {/* modifiers */}
                            <ModifierButton modifier="CHA" value={character.modifiers.charisma} onClick={() => { this.onModifierClick(Modifiers.Charisma); }} />
                            <ModifierButton modifier="PRO" value={character.modifiers.proficiency} onClick={() => { this.onModifierClick(Modifiers.Proficiency); }} />
                            <ModifierButton modifier="INI" value={character.modifiers.initiative} onClick={() => { this.onModifierClick(Modifiers.Initiative); }} />
                        </div>
                    </>
                }

                {!character &&
                    <div className="select-character mt-4 text-center d-flex justify-content-center align-items-center">
                        Select a Character to apply modifiers
                    </div>
                }
                <div className="row mt-4 d-flex flex-row justify-content-around">
                    <Button text="Roll" style={{ height: '3rem' }} className="w-100" onClick={() => { this.onRollClick(); }} />
                </div>
                <div className="row mt-1 d-flex flex-row justify-content-around">
                    <Button text="Clear" style={{ height: '3rem' }} className="w-100" onClick={() => { this.onClearClick(); }} />
                </div>

            </div>
        );
    }
}

export default Calculator;