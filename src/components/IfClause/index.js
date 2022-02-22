import React from 'react';

import { getVerticalDirection } from '../../helpers/input';
import { clamp } from '../../helpers/math';
import { getIndent, PRINTER_EMPTY } from '../../helpers/printer';

import { Input } from '../Input';
import StatementBlock from '../StatementBlock';

import './index.scss';

export class IfClause extends React.PureComponent {
  codePrinters = {
    condition: PRINTER_EMPTY,
    body: PRINTER_EMPTY,
  };
  state = {
    focusedIndex: 0,
  };

  componentDidMount() {
    this.props.setOnGetCode(this.getCode);
  }

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

  getCode = () => {
    const indentation = getIndent(this.props.indent);
    return `${indentation}if (${this.codePrinters.condition()}) {\n${this.codePrinters.body()}${indentation}}\n`;
  };

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
            setOnGetCode={(codePrinter) =>
              (this.codePrinters.condition = codePrinter)
            }
          />
          <span>) {'{'}</span>
        </div>
        <div onClick={() => this.handleInputClick(1)}>
          <StatementBlock
            id={'IfClauseBody_' + this.props.id}
            indent={this.props.indent}
            isFocused={this.props.isFocused && focusedIndex === 1}
            initialStatements={[
              {
                type: 'Input',
                id: 'IfClauseBody_' + this.props.id + new Date().getTime(),
              },
            ]}
            allowedStatements={{
              FunctionBlock: false,
              IfClause: true,
            }}
            setOnGetCode={(codePrinter) =>
              (this.codePrinters.body = codePrinter)
            }
          />
        </div>
        <div>
          <span>{'}'}</span>
        </div>
      </div>
    );
  }
}
