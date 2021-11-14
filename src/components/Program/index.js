import React from 'react';
import { getVerticalDirection, isVerticalArrow } from '../../helpers/input';

import { clamp } from '../../helpers/math';

import { Input } from '../Input';

class Program extends React.PureComponent {
  state = {
    statements: [
      { type: 'Input', key: new Date().getTime() },
      { type: 'Input', key: new Date().getTime() + 1 },
    ],
    focusedStatement: 0,
  };

  componentDidMount() {
    this.setState({ focusedStatement: this.state.statements.length - 1 });
  }

  removeStatement(key) {
    const { statements } = this.state;

    const newStatements = [...statements];
    const index = newStatements.findIndex((e) => e.key === key);

    if (index !== -1) {
      newStatements.splice(index, 1);

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
      key: new Date().getTime(),
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

  handleClick(index) {
    this.setState({
      focusedStatement: index,
    });
  }

  renderStatements = () => {
    return this.state.statements.map((statement, index) => {
      switch (statement.type) {
        case 'Input': {
          return (
            <Input
              key={`s_${statement.key}`}
              removeSelf={() => this.removeStatement(statement.key)}
              handleEnter={() => this.handleEnter(index)}
              handleClick={() => this.handleClick(index)}
              isFocused={this.state.focusedStatement === index}
            />
          );
        }
        default:
          throw new Error('Unknown statement component', statement);
      }
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className='Program' onKeyDown={(e) => this.handleKey(e)}>
        {this.renderStatements()}
      </div>
    );
  }
}

export default Program;
