import React from 'react';
import './App.scss';
import Calculator from './components/Calculator';
import CharacterList from './components/CharacterList';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      character: null
    }

    this.onCharacterSelectedCallback = this.onCharacterSelectedCallback.bind(this);
  }

  onCharacterSelectedCallback(selected_character) {
    this.setState({
      character: selected_character
    });
  }

  render() {
    const { character } = this.state;

    return (
      <div className="container-fluid d-flex flex-column h-100">

        <div className="row d-flex flex-fill h-auto">
          <div className="col-5 d-flex justify-content-center align-items-center">
            {/* calculator   */}
            <Calculator character={character} />
          </div>

          <div className="col-3">
            {/* history */}
          </div>

          <div className="col">
            {/* characters */}
            <CharacterList characterSelectedCallback={this.onCharacterSelectedCallback} />
          </div>
        </div>

        <footer className="footer mt-auto py-3">
          <div className="container border-top border-dark">
            <div className="pt-3 d-flex flex-row justify-content-around">
              <span className="text-muted"><i className="far fa-copyright"></i> coolbots7 - {new Date().getFullYear()}</span>
              <span className="text-muted"><i className="fab fa-github"></i> GitHub: <a href="https://github.com/Coolbots7/dnd-calculator" className="text-muted">https://github.com/Coolbots7/dnd-calculator</a></span>
            </div>
          </div>
        </footer>

      </div>
    );
  }

}
export default App;
