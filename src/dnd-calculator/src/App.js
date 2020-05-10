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
      <div className="container-fluid h-100">

        <div className="row h-100">
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

      </div>
    );
  }

}
export default App;
