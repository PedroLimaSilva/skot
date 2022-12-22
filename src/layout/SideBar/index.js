import React from 'react';

import './index.scss';

export class SideBar extends React.PureComponent {
  render() {
    return (
      <div className='SideBar'>
        <div className='Files'>
          <h1>SKot</h1>
          <h2>Files</h2>
          <div className='File open'>main.kt</div>
        </div>
        <div className='About'>
          <a href='https://github.com/PedroLimaSilva/skot' target='_blank' rel="noreferrer">
            Source Code
          </a>
        </div>
      </div>
    );
  }
}
