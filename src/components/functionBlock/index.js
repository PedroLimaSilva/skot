import React from 'react';

import {
  getHorizontalDirection,
  getVerticalDirection,
} from '../../helpers/input';
import { clamp } from '../../helpers/math';
import { getIndent, PRINTER_EMPTY } from '../../helpers/printer';

import { Input } from '../Input';
import StatementBlock from '../StatementBlock';

import './index.scss';

// eslint-disable-next-line no-useless-escape
const FUNCTION_NAME_REGEX = /[a-zA-Z_$]+/gm;
// eslint-disable-next-line no-useless-escape
const FUNCTION_ARGUMENTS_REGEX =
  /([a-zA-Z_$]+: ([A-Z][a-zA-Z]*), )|([a-zA-Z_$]+: ([A-Z][a-zA-Z]*))/gm;
const FUNCTION_TYPE_REGEX = /([A-Z][a-zA-Z]*)/gm;

const FOCUSED_MAP = {
  NAME: 0,
  ARGS: 1,
  TYPE: 2,
  BODY: 3,
};

export class FunctionBlock extends React.PureComponent {
  codePrinters = {
    name: PRINTER_EMPTY,
    args: PRINTER_EMPTY,
    type: PRINTER_EMPTY,
    body: PRINTER_EMPTY,
  };

  state = {
    focusedIndex: FOCUSED_MAP.NAME,
  };

  componentDidMount() {
    this.props.setOnGetCode(this.getCode);
  }

  handleInputClick(index) {
    this.setState({ focusedIndex: index });
  }

  handleKeydown(e) {
    const { focusedIndex } = this.state;
    const verticalDirection = getVerticalDirection(e);
    const horizontalDirection = getHorizontalDirection(e);
    if (verticalDirection || horizontalDirection) {
      let newIndex = focusedIndex;
      switch (focusedIndex) {
        case FOCUSED_MAP.NAME: {
          if (verticalDirection > 0) {
            newIndex = FOCUSED_MAP.BODY;
            break;
          }
          if (horizontalDirection > 0) {
            newIndex = FOCUSED_MAP.ARGS;
            break;
          }
          break;
        }
        case FOCUSED_MAP.ARGS: {
          if (verticalDirection > 0) {
            newIndex = FOCUSED_MAP.BODY;
            break;
          }
          if (horizontalDirection > 0) {
            newIndex = FOCUSED_MAP.TYPE;
            break;
          } else if (horizontalDirection < 0) {
            newIndex = FOCUSED_MAP.NAME;
            break;
          }
          break;
        }
        case FOCUSED_MAP.TYPE: {
          if (verticalDirection > 0 || horizontalDirection > 0) {
            newIndex = FOCUSED_MAP.BODY;
            break;
          }
          if (horizontalDirection < 0) {
            newIndex = FOCUSED_MAP.ARGS;
            break;
          }
          break;
        }
        case FOCUSED_MAP.BODY: {
          if (verticalDirection < 0 || horizontalDirection < 0) {
            newIndex = FOCUSED_MAP.ARGS;
          }
          break;
        }
        default: {
        }
      }
      if (focusedIndex !== newIndex) {
        e.stopPropagation();
      } else if (verticalDirection < 0 || horizontalDirection < 0) {
        newIndex = FOCUSED_MAP.NAME;
      } else if (verticalDirection > 0 || horizontalDirection > 0) {
        newIndex = FOCUSED_MAP.BODY;
      }
      this.setState({
        focusedIndex: newIndex,
      });
    }
  }

  getCode = () => {
    const indent = getIndent(this.props.getIndent);
    return `${indent}fun ${this.codePrinters.name()} (${this.codePrinters.args()}): ${this.codePrinters.type()} {\n${this.codePrinters.body()}${indent}}`;
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
              isFocused={
                this.props.isFocused && focusedIndex === FOCUSED_MAP.NAME
              }
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
              isFocused={
                this.props.isFocused && focusedIndex === FOCUSED_MAP.ARGS
              }
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
              isFocused={
                this.props.isFocused && focusedIndex === FOCUSED_MAP.TYPE
              }
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
            indent={this.props.indent + 1}
            isFocused={
              this.props.isFocused && focusedIndex === FOCUSED_MAP.BODY
            }
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
