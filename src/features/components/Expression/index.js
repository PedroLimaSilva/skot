import { connect } from 'react-redux';

import {
  updateExpression,
  upgradeExpressionToBinary,
  upgradeExpressionWithUnaryOperator,
} from '../../../store/actions';

import { CodeBlock } from '../CodeBlock';
import { Input } from '../Input';

import './index.scss';

const EXPRESSION_REGEX = /[a-zA-Z0-9()_$]+/gm;

const UNARY_OPERATORS = ['!', '++', '--'];
const BINARY_OPERATORS = ['+', '-', '*', '/', '%'];

/**
 * TO DO use this in return statements, if, right side of attributions, either side of *+-/
 */
export class ExpressionComponent extends CodeBlock {
  mutating = false;

  OPERATOR_MAP = {
    ' ': {
      effect: (value) => this.handleIncomingOperator(value, ' '),
      pre: (value) =>
        value.replace(/\s+/g, '').length > 0 && value.charAt(0) !== '"',
    },
    '!': {
      effect: (value) => this.handleIncomingOperator(value, '!'),
      pre: (value) => value === '',
    },
    // '+': {
    //   effect: (value) => this.handleIncomingOperator(value, '++'),
    //   pre: (value) => value.charAt(value.length-1)===@,
    // },
  };

  handleInput = (e) => {
    const trigger = this.OPERATOR_MAP[e.nativeEvent.data];
    if (trigger) {
      const currentValue = e.target.value;
      if (trigger.pre(e.target.value) || !trigger.pre) {
        trigger.effect(currentValue);
        this.mutating = true;
      }
    }
  };

  handleIncomingOperator = (value, operator) => {
    console.log('triggered operator possibility', value, operator);
    if (operator === ' ') {
      this.props.upgradeExpressionToBinary({
        focusTarget: this.props.expression._id,
        path: this.state.path,
        value,
      });
    } else {
      this.props.upgradeExpressionWithUnaryOperator(operator);
    }
    this.mutating = false;
  };

  handleInputUpdate = (e) => {
    if (!this.mutating) {
      this.props.updateExpression({
        path: [...this.state.path, 'content'],
        value: e,
      });
    }
  };

  render() {
    const { expression } = this.props;
    if (Array.isArray(expression.content)) {
      return (
        <div className='Expression'>
          {expression.content[1] && (
            <Expression
              expression={expression.content[0]}
              path={this.state.path}
              stateKeys={['content', 0]}
            />
          )}
          {/* TODO: Create operator component to handle focusing next expression */}
          <select name='operators' defaultValue={expression.operator}>
            {expression.content[1] !== undefined &&
              BINARY_OPERATORS.map((op) => (
                <option key={`option_${op}`} value={op}>
                  {op}
                </option>
              ))}
            {expression.content[1] === undefined &&
              UNARY_OPERATORS.map((op) => (
                <option key={`option_${op}`} value={op}>
                  {op}
                </option>
              ))}
          </select>
          <Expression
            expression={expression.content[1]}
            path={this.state.path}
            stateKeys={['content', 1]}
          />
        </div>
      );
    } else {
      return (
        <div className='Expression' onInput={this.handleInput}>
          <Input
            id={expression._id}
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

export const Expression = connect(null, {
  updateExpression,
  upgradeExpressionToBinary,
  upgradeExpressionWithUnaryOperator,
})(ExpressionComponent);
