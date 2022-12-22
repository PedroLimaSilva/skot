import React from 'react';

import './index.scss';

// import { PRINTER_EMPTY } from './helpers/printer';
import File from '../../features/components/File';

export class Editor extends React.PureComponent {
  // codePrinter = PRINTER_EMPTY;

  // print = () => {
  //   console.log(this.codePrinter());
  // };

  render() {
    return (
      <div className='Editor'>
        {/* <button onClick={this.print}>Get Code</button> */}
        <File path={[]} stateKeys={[]} />
      </div>
    );
  }
}
