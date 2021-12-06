import React from 'react';

import { getVerticalDirection } from '../../helpers/input';
import { clamp } from '../../helpers/math';

import { Input } from '../Input';
import StatementBlock from '../StatementBlock';

import './index.scss';

export class IfClause extends React.PureComponent {
  state = {
    focusedIndex: 0,
  };

  handleInputClick(index) {
    this.setState({ focusedIndex: index });
  }

  handleKeydown(e) {
    const direction = getVerticalDirection(e);
    if (direction) {
      const newIndex = clamp(this.state.focusedIndex + direction, 0, 1);
      if (this.state.focusedIndex !== newIndex) {
        e.stopPropagation();
      }
      this.setState({
        focusedIndex: newIndex,
      });
    }
  }

  render() {
    const { focusedIndex } = this.state;
    return (
      <div
        className='IfClause'
        onClick={this.props.handleClick}
        onKeyDown={(e) => {
          this.handleKeydown(e);
        }}
      >
        <div className='header' onClick={() => this.handleInputClick(0)}>
          <span>if (</span>
          <Input
            removeSelf={this.props.removeSelf}
            className='inline'
            isFocused={this.props.isFocused && focusedIndex === 0}
            handleEnter={this.props.handleEnter}
            onClick={() => this.handleInputClick(0)}
          />
          <span>) {'{'}</span>
        </div>
        <div onClick={() => this.handleInputClick(1)}>
          <StatementBlock
            id={'IfClauseBody_' + this.props.id}
            isFocused={this.props.isFocused && focusedIndex === 1}
            initialStatements={[
              {
                type: 'Input',
                id: 'IfClauseBody_' + this.props.id + new Date().getTime(),
              },
            ]}
            allowedStatements={{
              FunctionBlock: false,
              IfStatement: true,
            }}
          />
        </div>
        <div>
          <span>{'}'}</span>
        </div>
      </div>
    );
  }
}
