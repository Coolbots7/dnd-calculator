import React from 'react';
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
    Proficiency: "PRO"
}

function getModifierValue(modifier) {
    switch (modifier) {
        case Modifiers.Strength:
            return 1;
        case Modifiers.Dexterity:
            return 2;
        case Modifiers.Constitution:
            return 1;
        case Modifiers.Intelligence:
            return 2;
        case Modifiers.Wisdom:
            return 1;
        case Modifiers.Charisma:
            return 1;
        case Modifiers.Proficiency:
            return 2;
        default:
            return 0;
    }
}

function rollDie(die) {
    return Math.floor(Math.random() * die) + 1;
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expression: null,
            state: CalculatorState.EMPTY
        };

        this.onQuantityButtonClick = this.onQuantityButtonClick.bind(this);
        this.onDieButtonClick = this.onDieButtonClick.bind(this);
        this.onModifierClick = this.onModifierClick.bind(this);
        this.onRollClick = this.onRollClick.bind(this);
        this.onClearClick = this.onClearClick.bind(this);
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
                expression: newExpression
            });

            //Note: state remains Modifier
        }
    }

    onRollClick() {
        var { state, expression } = this.state;

        //check state is valid for roll
        if (state === CalculatorState.DIE_OR_MODIFIER || state === CalculatorState.MODIFIER) {
            //Remove all whitespace
            expression = expression.replace(/ /g, '');

            //split expression into arguments on +
            const args = expression.split("+");

            var rollTotal = 0;
            var rollString = "";

            //for each argument
            for (var i = 0; i < args.length; i++) {
                const arg = args[i];

                if (i > 0) {
                    rollString += " +";
                }

                //Test if argument is dice roll or modifier
                if (arg.match(/\d+d\d+/g)) {
                    const dieRoll = arg.split("d");
                    const quantity = parseInt(dieRoll[0]);
                    const die = parseInt(dieRoll[1]);

                    if (quantity === 1) {
                        const rollValue = rollDie(die);
                        rollString += " " + rollValue;
                        rollTotal += rollValue;
                    }
                    else {
                        rollString += " (";

                        for (var j = 0; j < quantity; j++) {
                            if (j > 0) {
                                rollString += " + ";
                            }

                            const rollValue = rollDie(die);
                            rollString += rollValue;
                            rollTotal += rollValue;
                        }

                        rollString += ")";
                    }

                }
                else {
                    const modifier = getModifierValue(arg);
                    rollString += " " + modifier;
                    rollTotal += modifier;
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
                    {/* modifiers */}
                    <ModifierButton modifier="STR" value="+1" onClick={() => { this.onModifierClick(Modifiers.Strength); }} />
                    <ModifierButton modifier="DEX" value="+2" onClick={() => { this.onModifierClick(Modifiers.Dexterity); }} />
                    <ModifierButton modifier="CON" value="+1" onClick={() => { this.onModifierClick(Modifiers.Constitution); }} />
                    <ModifierButton modifier="INT" value="+2" onClick={() => { this.onModifierClick(Modifiers.Intelligence); }} />
                    <ModifierButton modifier="WIS" value="+1" onClick={() => { this.onModifierClick(Modifiers.Wisdom); }} />
                </div>
                <div className="row mt-2 d-flex flex-row justify-content-around">
                    {/* modifiers */}
                    <ModifierButton modifier="CHA" value="+1" onClick={() => { this.onModifierClick(Modifiers.Charisma); }} />
                    <ModifierButton modifier="PRO" value="+2" onClick={() => { this.onModifierClick(Modifiers.Proficiency); }} />
                </div>
                <div className="row mt-4 d-flex flex-row justify-content-around">
                    <Button text="Roll" style={{height: '3rem'}} className="w-100" onClick={() => { this.onRollClick(); }} />
                </div>
                <div className="row mt-1 d-flex flex-row justify-content-around">
                    <Button text="Clear" style={{height: '3rem'}} className="w-100" onClick={() => { this.onClearClick(); }} />
                </div>

            </div>
        );
    }
}

export default Calculator;