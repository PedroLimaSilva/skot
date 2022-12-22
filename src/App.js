import './App.scss';
import React from 'react';
import { PRINTER_EMPTY } from './helpers/printer';
import { Editor } from './layout/Editor';
import { SideBar } from './layout/SideBar';
import { Tabs } from './layout/Tabs';

class App extends React.PureComponent {
  codePrinter = PRINTER_EMPTY;

  print = () => {
    console.log(this.codePrinter());
  };

  render() {
    return (
      <div className='App'>
        <SideBar />
        <Tabs />
        <Editor />
        {/* <button onClick={this.print}>Get Code</button> */}
      </div>
    );
  }
}

export default App;
