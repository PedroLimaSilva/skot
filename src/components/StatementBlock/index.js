import React from 'react';

import { getVerticalDirection } from '../../helpers/input';
import { clamp } from '../../helpers/math';
import { FunctionBlock } from '../functionBlock';

import { IfClause } from '../IfClause';
import { Input } from '../Input';

import './index.scss';

class StatementBlock extends React.PureComponent {
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
  }

  removeStatement(id) {
    const { statements } = this.state;

    const newStatements = [...statements];
    const index = newStatements.findIndex((e) => e.id === id);

    if (index !== -1) {
      newStatements.splice(index, 1);

      if (newStatements.length === 0) {
        newStatements.push({
          type: 'Input',
          id: this.props.id + new Date().getTime(),
        });
      }
      this.setState({
        statements: newStatements,
        focusedStatement: clamp(index, 0, newStatements.length - 1),
      });
    }
  }

  handleEnter(index) {
    const { statements } = this.state;

    const newStatements = [...statements];

    newStatements.splice(index + 1, 0, {
      type: 'Input',
      id: this.props.id + new Date().getTime(),
    });

    this.setState({
      statements: newStatements,
      focusedStatement: index + 1,
    });
  }

  handleKey(event) {
    const direction = getVerticalDirection(event);
    if (direction) {
      this.setState({
        focusedStatement: clamp(
          this.state.focusedStatement + direction,
          0,
          this.state.statements.length
        ),
      });
    }
  }

  handleKeywordTyped(index, keyword) {
    const { allowedStatements } = this.props;

    if (!allowedStatements || allowedStatements[keyword]) {
      const { statements } = this.state;

      const newStatements = [...statements];

      // delete current input
      newStatements.splice(index, 1, {
        type: 'Input',
        id: this.props.id + (new Date().getTime() + 1),
      });
      // add typed statement in front of it
      newStatements.splice(index + 1, 0, {
        type: keyword,
        id: this.props.id + (new Date().getTime() + 2),
      });
      // add new input in front
      newStatements.splice(index + 2, 0, {
        type: 'Input',
        id: this.props.id + (new Date().getTime() + 3),
      });

      this.setState({
        statements: newStatements,
        focusedStatement: index,
      });
    }
  }

  handleClick(e, index) {
    this.setState({
      focusedStatement: index,
    });
  }

  renderStatements = () => {
    const { statements, focusedStatement } = this.state;
    return statements?.map((statement, index) => {
      switch (statement.type) {
        case 'Input': {
          return (
            <Input
              key={`s_${statement.id}`}
              removeSelf={() => this.removeStatement(statement.id)}
              handleEnter={() => this.handleEnter(index)}
              handleClick={(e) => this.handleClick(e, index)}
              isFocused={this.props.isFocused && focusedStatement === index}
              onKeywordTyped={(keyword) =>
                this.handleKeywordTyped(index, keyword)
              }
            />
          );
        }
        case 'IfClause': {
          return (
            <IfClause
              key={`s_${statement.id}`}
              id={`s_${statement.id}`}
              removeSelf={() => this.removeStatement(statement.id)}
              handleClick={(e) => this.handleClick(e, index)}
              handleEnter={() => this.handleEnter(index)}
              isFocused={this.props.isFocused && focusedStatement === index}
            />
          );
        }
        case 'FunctionBlock': {
          return (
            <FunctionBlock
              key={`s_${statement.id}`}
              id={`s_${statement.id}`}
              removeSelf={() => this.removeStatement(statement.id)}
              handleClick={(e) => this.handleClick(e, index)}
              handleEnter={() => this.handleEnter(index)}
              isFocused={this.props.isFocused && focusedStatement === index}
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
