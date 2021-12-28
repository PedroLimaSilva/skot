import React from 'react';

import { getVerticalDirection } from '../../helpers/input';
import { clamp } from '../../helpers/math';
import { PRINTER_EMPTY } from '../../helpers/printer';
import { FunctionBlock } from '../functionBlock';

import { IfClause } from '../IfClause';
import { Input } from '../Input';

import './index.scss';

class StatementBlock extends React.PureComponent {
  codePrinters = {};
  reloadPrinters = true;
  state = {
    // does a child have the focus
    isFocused: true,
    statements: [],
    focusedStatement: 0,
  };

  componentDidMount() {
    this.setState({
      statements: this.props.initialStatements,
      focusedStatement: this.props.initialStatements?.length - 1 || 0,
    });

    this.props.setOnGetCode(this.getCode);
  }

  removeStatement(id) {
    const { statements } = this.state;

    const newStatements = [...statements];
    const index = newStatements.findIndex((e) => e.id === id);

    if (index !== -1) {
      newStatements.splice(index, 1);

      const id = this.props.id + new Date().getTime();
      if (newStatements.length === 0) {
        newStatements.push({
          type: 'Input',
          id,
        });
      }

      delete this.codePrinters[id];
      this.setState({
        statements: newStatements,
        focusedStatement: clamp(index, 0, newStatements.length - 1),
      });
    }
  }

  handleEnter(index) {
    const { statements } = this.state;

    const newStatements = [...statements];

    const id = this.props.id + new Date().getTime();
    newStatements.splice(index + 1, 0, {
      type: 'Input',
      id,
    });

    this.codePrinters[id] = PRINTER_EMPTY;
    this.setState({
      statements: newStatements,
      focusedStatement: index + 1,
    });
  }

  handleKey(event) {
    const direction = getVerticalDirection(event);
    if (direction) {
      const index = clamp(
        this.state.focusedStatement + direction,
        0,
        this.state.statements.length
      );

      if (index !== this.state.focusedStatement) {
        event.stopPropagation();
      }
      this.setState({
        focusedStatement: index,
      });
    }
  }

  handleKeywordTyped(index, keyword) {
    const { allowedStatements } = this.props;

    if (!allowedStatements || allowedStatements[keyword]) {
      const { statements } = this.state;

      const newStatements = [...statements];

      // delete current input; replace with new input
      const currentInput = statements[index];
      delete this.codePrinters[currentInput.id];

      let id = this.props.id + (new Date().getTime() + 1);
      newStatements.splice(index, 1, {
        type: 'Input',
        id,
      });
      this.codePrinters[id] = PRINTER_EMPTY;

      // add typed statement in front of it
      id = this.props.id + (new Date().getTime() + 2);
      newStatements.splice(index + 1, 0, {
        type: keyword,
        id,
      });
      this.codePrinters[id] = PRINTER_EMPTY;

      // add new input in front
      id = this.props.id + (new Date().getTime() + 3);
      newStatements.splice(index + 2, 0, {
        type: 'Input',
        id,
      });
      this.codePrinters[id] = PRINTER_EMPTY;

      this.setState({
        statements: newStatements,
        focusedStatement: index + 1,
      });
    }
  }

  handleClick(e, index) {
    this.setState({
      focusedStatement: index,
    });
  }

  getCode = () => {
    let code = '';
    const keys = this.state.statements.map((statement) => statement.id);
    for (let i = 0, len = keys.length; i < len; i++) {
      const statementCode = this.codePrinters[keys[i]]();
      code += statementCode;
    }
    return code;
  };

  setOnGetCode = (id, codePrinter) => {
    this.codePrinters[id] = codePrinter;
  };

  renderStatements = () => {
    const { statements, focusedStatement } = this.state;
    return statements?.map((statement, index) => {
      switch (statement.type) {
        case 'Input': {
          return (
            <Input
              key={`s_${statement.id}`}
              id={`s_${statement.id}`}
              indent={this.props.indent + 1}
              removeSelf={() => this.removeStatement(statement.id)}
              handleEnter={() => this.handleEnter(index)}
              handleClick={(e) => this.handleClick(e, index)}
              isFocused={this.props.isFocused && focusedStatement === index}
              onKeywordTyped={(keyword) =>
                this.handleKeywordTyped(index, keyword)
              }
              setOnGetCode={this.setOnGetCode.bind(this, statement.id)}
            />
          );
        }
        case 'IfClause': {
          return (
            <IfClause
              key={`s_${statement.id}`}
              id={`s_${statement.id}`}
              indent={this.props.indent + 1}
              removeSelf={() => this.removeStatement(statement.id)}
              handleClick={(e) => this.handleClick(e, index)}
              handleEnter={() => this.handleEnter(index)}
              isFocused={this.props.isFocused && focusedStatement === index}
              setOnGetCode={this.setOnGetCode.bind(this, statement.id)}
            />
          );
        }
        case 'FunctionBlock': {
          return (
            <FunctionBlock
              key={`s_${statement.id}`}
              id={`s_${statement.id}`}
              indent={this.props.indent + 1}
              removeSelf={() => this.removeStatement(statement.id)}
              handleClick={(e) => this.handleClick(e, index)}
              handleEnter={() => this.handleEnter(index)}
              isFocused={this.props.isFocused && focusedStatement === index}
              setOnGetCode={this.setOnGetCode.bind(this, statement.id)}
            />
          );
        }
        default:
          throw new Error('Unknown statement component', statement);
      }
    });
  };

  render() {
    return (
      <div className='StatementBlock' onKeyDown={(e) => this.handleKey(e)}>
        {this.renderStatements()}
      </div>
    );
  }
}

export default StatementBlock;
