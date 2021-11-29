import React from 'react';

import { getHorizontalDirection, getVerticalDirection } from '../../helpers/input';
import { clamp } from '../../helpers/math';

import { Input } from '../Input';
import Program from '../Program';

import './index.scss';

export class FunctionBlock extends React.PureComponent {
  state = {
    focusedIndex: 0,
  };

  handleInputClick(index) {
    this.setState({ focusedIndex: index });
  }

  handleKeydown(e) {
    const direction = getVerticalDirection(e) || getHorizontalDirection(e);
    if (direction) {
      const newIndex = clamp(this.state.focusedIndex + direction, 0, 2);
      if (this.state.focusedIndex !== newIndex) {
        e.stopPropagation();
      }
      this.setState({
        focusedIndex: newIndex,
      });
      return;
    }
  }

  render() {
    const { focusedIndex } = this.state;
    return (
      <div
        className='FunctionBlock'
        onClick={this.props.handleClick}
        onKeyDown={(e) => {
          this.handleKeydown(e);
        }}
      >
        <div className='header' onClick={() => this.handleInputClick(0)}>
          <span>fun </span>
          <Input
            removeSelf={this.props.removeSelf}
            className='inline'
            isFocused={this.props.isFocused && focusedIndex === 0}
            handleEnter={this.props.handleEnter}
            onClick={() => this.handleInputClick(0)}
          />
          <span> (</span>
          <Input
            removeSelf={this.props.removeSelf}
            className='inline'
            isFocused={this.props.isFocused && focusedIndex === 1}
            handleEnter={this.props.handleEnter}
            onClick={() => this.handleInputClick(1)}
          />
          <span>) {'{'}</span>
        </div>
        <div onClick={() => this.handleInputClick(2)}>
          <Program
            id={'FunctionBlockBody_' + this.props.id}
            isFocused={this.props.isFocused && focusedIndex === 2}
            initialStatements={[
              {
                type: 'Input',
                id: 'FunctionBlockBody_' + this.props.id + new Date().getTime(),
              },
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
