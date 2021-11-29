import './App.scss';
import React from 'react';
import Program from './components/Program';

class App extends React.PureComponent {
  render() {
    return (
      <div className='App'>
        <Program
          id='FileRootProgram'
          isFocused={true}
          initialStatements={[
            { type: 'Input', id: new Date().getTime() },
            { type: 'IfClause', id: new Date().getTime() + 1 },
          ]}
        />
      </div>
    );
  }
}

export default App;
