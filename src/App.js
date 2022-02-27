import './App.scss';
import React from 'react';
import { PRINTER_EMPTY } from './helpers/printer';
import File from './features/file';

class App extends React.PureComponent {
  codePrinter = PRINTER_EMPTY;

  print = () => {
    console.log(this.codePrinter());
  };

  render() {
    return (
      <div className='App'>
        {/* <button onClick={this.print}>Get Code</button> */}
        <File />
        {/* <StatementBlock
          ref={this.ref}
          id='FileRootProgram'
          indent={0}
          isFocused={true}
          initialStatements={[
            { type: 'Input', id: new Date().getTime() },
            { type: 'FunctionBlock', id: new Date().getTime() + 1 },
            { type: 'Input', id: new Date().getTime() + 2 },
          ]}
          allowedStatements={{
            Input: true,
            FunctionBlock: true,
          }}
          setOnGetCode={(codePrinter) => (this.codePrinter = codePrinter)}
        /> */}
      </div>
    );
  }
}

export default App;
