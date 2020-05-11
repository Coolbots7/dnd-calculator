import React from 'react';
import './App.scss';
import Calculator from './components/Calculator';
import CharacterList from './components/CharacterList';
import HistoryList from './components/HistoryList';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      character: null,
      history: []
    }

    this.onCharacterSelectedCallback = this.onCharacterSelectedCallback.bind(this);
    this.onRollCallback = this.onRollCallback.bind(this);
  }

  onCharacterSelectedCallback(selected_character) {
    this.setState({
      character: selected_character
    });
  }

  onRollCallback(historyItem) {
    var { history } = this.state;    

    history.push(historyItem);

    this.setState({
      history
    });
  }

  render() {
    const { character, history } = this.state;

    return (
      <div className="container-fluid d-flex flex-column h-100">

        <div className="row d-flex flex-fill h-auto">
          <div className="col-sm-4 col-12 d-flex justify-content-center align-items-center">
            {/* calculator   */}
            <Calculator character={character} onRoll={this.onRollCallback} />
          </div>

          <div className="col-sm col-12 my-5">
            {/* history */}
            <HistoryList history={history} />
          </div>

          <div className="col-sm col-12">
            {/* characters */}
            <CharacterList characterSelectedCallback={this.onCharacterSelectedCallback} />
          </div>
        </div>

        <footer className="footer mt-auto py-3">
          <div className="container border-top border-dark">
            <div className="pt-3 d-flex flex-row justify-content-around">
              <span className="text-muted"><i className="far fa-copyright"></i> coolbots7 - {new Date().getFullYear()}</span>
              <div className="d-flex flex-column">
                <span className="text-muted"><i className="fab fa-github"></i> GitHub: <a href="https://github.com/Coolbots7/dnd-calculator" className="text-muted">https://github.com/Coolbots7/dnd-calculator</a></span>
                <span className="text-muted">Dice Notation: <a href="https://en.wikipedia.org/wiki/Dice_notation" className="text-muted">https://en.wikipedia.org/wiki/Dice_notation</a></span>
              </div>
            </div>
          </div>
        </footer>

      </div>
    );
  }

}
export default App;
