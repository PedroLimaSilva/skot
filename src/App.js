import './App.scss';
import React from 'react';
import { PRINTER_EMPTY } from './helpers/printer';
import File from './features/components/file';

class App extends React.PureComponent {
  codePrinter = PRINTER_EMPTY;

  print = () => {
    console.log(this.codePrinter());
  };

  render() {
    return (
      <div className='App'>
        {/* <button onClick={this.print}>Get Code</button> */}
        <File path={[]} stateKeys={[]} />
      </div>
    );
  }
}

export default App;
