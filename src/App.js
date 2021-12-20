import './App.scss';
import React from 'react';
import StatementBlock from './components/StatementBlock';

class App extends React.PureComponent {
  render() {
    return (
      <div className='App'>
        <StatementBlock
          id='FileRootProgram'
          isFocused={true}
          initialStatements={[
            { type: 'Input', id: new Date().getTime() },
            { type: 'FunctionBlock', id: new Date().getTime() + 1 },
          ]}
          allowedStatements={{
            Input: true,
            FunctionBlock: true,
          }}
        />
      </div>
    );
  }
}

export default App;
