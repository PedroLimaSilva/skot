import './App.scss';
import React from 'react';
import Program from './components/Program';

class App extends React.PureComponent {
  render() {
    return (
      <div className='App'>
        <Program />
      </div>
    );
  }
}

export default App;
