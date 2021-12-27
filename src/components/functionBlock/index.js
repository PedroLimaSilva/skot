import React from 'react';

import {
  getHorizontalDirection,
  getVerticalDirection,
} from '../../helpers/input';
import { clamp } from '../../helpers/math';

import { Input } from '../Input';
import StatementBlock from '../StatementBlock';

import './index.scss';

// eslint-disable-next-line no-useless-escape
const FUNCTION_NAME_REGEX = /[a-zA-Z_$]+/gm;
// eslint-disable-next-line no-useless-escape
const FUNCTION_ARGUMENTS_REGEX =
  /([a-zA-Z_$]+: ([A-Z][a-zA-Z]*), )|([a-zA-Z_$]+: ([A-Z][a-zA-Z]*))/gm;
const FUNCTION_TYPE_REGEX = /([A-Z][a-zA-Z]*)/gm;

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
      const newIndex = clamp(this.state.focusedIndex + direction, 0, 3);
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
        <div className='header'>
          <div onClick={() => this.handleInputClick(0)}>
            <span>fun </span>
            <Input
              id={'FunctionBlockName_' + this.props.id}
              removeSelf={this.props.removeSelf}
              className='inline'
              regex={FUNCTION_NAME_REGEX}
              isFocused={this.props.isFocused && focusedIndex === 0}
              handleEnter={this.props.handleEnter}
            />
          </div>
          <div onClick={() => this.handleInputClick(1)}>
            <span> (</span>
            <Input
              id={'FunctionBlockArgs_' + this.props.id}
              removeSelf={this.props.removeSelf}
              className='inline'
              regex={FUNCTION_ARGUMENTS_REGEX}
              isFocused={this.props.isFocused && focusedIndex === 1}
              handleEnter={this.props.handleEnter}
            />
            <span>): </span>
          </div>
          <div onClick={() => this.handleInputClick(2)}>
            <Input
              id={'FunctionBlockType_' + this.props.id}
              removeSelf={this.props.removeSelf}
              className='inline'
              regex={FUNCTION_TYPE_REGEX}
              isFocused={this.props.isFocused && focusedIndex === 2}
              handleEnter={this.props.handleEnter}
            />
            <span>{'{'}</span>
          </div>
        </div>
        <div onClick={() => this.handleInputClick(3)}>
          <StatementBlock
            id={'FunctionBlockBody_' + this.props.id}
            isFocused={this.props.isFocused && focusedIndex === 3}
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