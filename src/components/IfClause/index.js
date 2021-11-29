import React from 'react';
import { Input } from '../Input';
import Program from '../Program';

import './index.scss';

export class IfClause extends React.PureComponent {
  state = {
    focusedIndex: 0,
  };

  handleInputClick(index) {
    this.setState({ focusedIndex: index });
  }

  render() {
    const { focusedIndex } = this.state;
    return (
      <div className='IfClause' onClick={this.props.handleClick}>
        <div className='header' onClick={() => this.handleInputClick(0)}>
          <span>if (</span>
          <Input
            removeSelf={this.props.removeSelf}
            className='inline'
            isFocused={this.props.isFocused && focusedIndex === 0}
            onClick={() => this.handleInputClick(0)}
          />
          <span>) {'{'}</span>
        </div>
        <div onClick={() => this.handleInputClick(1)}>
          <Program
            id={'IfClauseBody_' + this.props.id}
            isFocused={this.props.isFocused && focusedIndex === 1}
            initialStatements={[
              { type: 'Input', id: this.props.id + new Date().getTime() },
            ]}
          />
        </div>
        <div>
          <span>{'}'}</span>
        </div>
      </div>
    );
  }
}
