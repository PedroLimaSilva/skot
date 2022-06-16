import { Component } from 'react';
import { Input } from '../Input';

import './index.scss';

const EXPRESSION_REGEX = /[a-zA-Z0-9()_$]+/gm;

const OPERATORS = ['+', '-', '*', '/', '%'];

/**
 * TO DO use this in return statements, if, right side of attributions, either side of *+-/
 */
export class Expression extends Component {
  isSpliting = false;

  OPERATOR_MAP = {
    ' ': {
      effect: () => (this.isSpliting = true),
      pre: (value) =>
        value.replace(/\s+/g, '').length > 0 && value.charAt(0) !== '"',
    },
    '!': {
      effect: (value) => {}, // TODO: Set operator
      pre: (value) => value === '',
    },
    '+': {
      effect: (value) => {}, // TODO: Set operator
      pre: (value) => this.isSpliting,
    },
  };

  handleInput = (e) => {
    const trigger = this.OPERATOR_MAP[e.nativeEvent.data];
    if (trigger) {
      const currentValue = e.target.value;
      if (trigger.pre(e.target.value) || !trigger.pre) {
        console.log(currentValue);
      }
    }
  };

  handleInputUpdate = (e) => {
    console.log('Update Expression with', e);
  };

  render() {
    const { expression } = this.props;
    if (Array.isArray(expression.content)) {
      return (
        <div className='Expression'>
          {expression.content[1] && (
            <Expression expression={expression.content[0]} />
          )}
          {/* TODO: Create operator component to handle focusing next expression */}
          <select name='operators' defaultValue={expression.operator}>
            {OPERATORS.map((op) => (
              <option key={`option_${op}`} value={op}>
                {op}
              </option>
            ))}
          </select>
          <Expression expression={expression.content[1]} />
        </div>
      );
    } else {
      return (
        <div className='Expression' onInput={this.handleInput}>
          <Input
            content={expression.content}
            inline
            regex={EXPRESSION_REGEX}
            onUpdate={this.handleInputUpdate}
          />
        </div>
      );
    }
  }
}
