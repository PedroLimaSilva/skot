import React from 'react';

import {
  getHorizontalDirection,
  getVerticalDirection,
} from '../../helpers/input';
import { clamp } from '../../helpers/math';
import { PRINTER_EMPTY } from '../../helpers/printer';

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
  codePrinters = {
    name: PRINTER_EMPTY,
    args: PRINTER_EMPTY,
    type: PRINTER_EMPTY,
    body: PRINTER_EMPTY,
  };

  state = {
    focusedIndex: 0,
  };

  componentDidMount() {
    this.props.setOnGetCode(this.getCode);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.reloadPrinter && this.props.reloadPrinter) {
      this.props.setOnGetCode(this.getCode);
    }
  }

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

  getCode = () => {
    return `fun ${this.codePrinters.name()} (${this.codePrinters.args()}): ${this.codePrinters.type()} {
      ${this.codePrinters.body()}
    }`;
  };

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
              setOnGetCode={(codePrinter) => {
                this.codePrinters.name = codePrinter;
              }}
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
              setOnGetCode={(codePrinter) => {
                this.codePrinters.args = codePrinter;
              }}
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
              setOnGetCode={(codePrinter) => {
                this.codePrinters.type = codePrinter;
              }}
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
            setOnGetCode={(codePrinter) => {
              this.codePrinters.body = codePrinter;
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
