import React from 'react';
import './App.scss';
import Calculator from './components/Calculator';

function App() {
  return (
    <div className="container-fluid h-100">

      <div className="row h-100">
        <div className="col-6 d-flex justify-content-center align-items-center">
          {/* calculator   */}
          <Calculator />          
        </div>

        <div className="col-3">
          {/* history */}
        </div>

        <div className="col-3">
          {/* characters */}
        </div>
      </div>

    </div>
  );
}

export default App;
