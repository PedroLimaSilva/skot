import { connect } from 'react-redux';

import {
  updateExpression,
  upgradeExpressionToBinary,
  upgradeExpressionWithUnaryOperator,
} from '../../../store/actions';

import { CodeBlock } from '../CodeBlock';
import { Input } from '../Input';
import { Select } from '../Input/select';

import './index.scss';

const EXPRESSION_REGEX = /[a-zA-Z0-9()_$]+/gm;

// const UNARY_OPERATORS = ['!', '++', '--'];
const BINARY_OPERATORS = ['+', '-', '*', '/', '%'];

/**
 * TO DO use this in return statements, if, right side of attributions, either side of *+-/
 */
export class ExpressionComponent extends CodeBlock {
  mutating = false;

  OPERATOR_MAP = {
    ' ': {
      effect: (value) => this.handleIncomingOperator(value, 'PENDING'),
      pre: (value) =>
        value.replace(/\s+/g, '').length > 0 && value.charAt(0) !== '"',
    },
    '!': {
      effect: (value) => this.handleIncomingOperator(value, '!'),
      pre: (value) => value === '',
    },
    default: {
      effect: (value, operator) => this.handleIncomingOperator(value, operator),
      pre: (value) => value.length > 0,
    },
  };

  handleInput = (e) => {
    const key = e.nativeEvent.data;
    let trigger = this.OPERATOR_MAP[key];
    if (!trigger && BINARY_OPERATORS.includes(key)) {
      trigger = this.OPERATOR_MAP.default;
    }
    if (trigger) {
      const currentValue = e.target.value;
      if (trigger.pre(e.target.value) || !trigger.pre) {
        trigger.effect(currentValue, key);
        this.mutating = true;
      }
    }
  };

  handleIncomingOperator = (value, operator) => {
    console.log('triggered operator possibility', value, operator);
    if (BINARY_OPERATORS.includes(operator) || operator === 'PENDING') {
      this.props.upgradeExpressionToBinary({
        focusTarget:
          operator === 'PENDING'
            ? `operator_${this.props.expression._id}`
            : `second_${this.props.expression._id}`,
        operator,
        path: this.state.path,
        value,
      });
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
          <Select
            id={`operator_${expression._id}`}
            defaultValue={expression.operator}
            options={BINARY_OPERATORS}
          />
          <Expression
            id={`second_${expression._id}`}
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
            id={this.props.id || expression._id}
            content={expression.content}
            inline
            regex={EXPRESSION_REGEX}
            onUpdate={this.handleInputUpdate}
            onDelete={() => this.props.onDelete?.()}
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
