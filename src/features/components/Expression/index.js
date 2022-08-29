import { connect } from 'react-redux';

import {
  deleteExpression,
  turnIntoFunctionCall,
  updateValueAtPath,
  upgradeExpressionToBinary,
  upgradeExpressionWithUnaryOperator,
} from '../../../store/actions';
import { STATEMENT_TYPES } from '../../language-support';

import { CodeBlock } from '../CodeBlock';
import { Input } from '../Input';
import { Select } from '../Input/select';
import FunctionCall from '../Function/Call';

import './index.scss';

const EXPRESSION_REGEX = /[a-zA-Z0-9()_$]+/gm;

// const UNARY_OPERATORS = ['!', '++', '--'];
const BINARY_OPERATORS = [
  '+',
  '-',
  '*',
  '/',
  '%',
  '>',
  '<',
  '>=',
  '<=',
  '==',
  '!=',
  '===',
  '!==',
  '||',
  '&&',
];

/**
 * TO DO use this in return statements, if, right side of attributions, either side of *+-/
 */
export class ExpressionComponent extends CodeBlock {
  mutating = false;

  pendingOperator = '';

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
    let key = e.nativeEvent.data;
    let trigger = this.OPERATOR_MAP[key];
    if (!trigger) {
      this.pendingOperator += key;
      console.log('pending operator', this.pendingOperator);
      if (
        BINARY_OPERATORS.includes(key) ||
        BINARY_OPERATORS.includes(this.pendingOperator)
      ) {
        trigger = this.OPERATOR_MAP.default;
      }
    }

    if (trigger) {
      const currentValue = e.target.value;
      if (trigger.pre(e.target.value) || !trigger.pre) {
        trigger.effect(currentValue, this.pendingOperator);
        this.mutating = true;
      }
    }
  };

  handleIncomingOperator = (value, operator) => {
    console.log('triggered operator possibility', value, operator);
    if (BINARY_OPERATORS.includes(operator) || operator === 'PENDING') {
      this.props.upgradeExpressionToBinary({
        focusTarget: operator === 'PENDING' ? `operator` : 'second',
        operator,
        path: this.state.path,
        value,
      });
    }

    this.pendingOperator = '';
    this.mutating = false;
  };

  handleInputUpdate = (e) => {
    if (!this.mutating) {
      this.props.updateValueAtPath({
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
              id={`${expression.content[0]._id}`}
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
            id={`${expression.content[1]._id}`}
            expression={expression.content[1]}
            path={this.state.path}
            stateKeys={['content', 1]}
          />
        </div>
      );
    } else {
      if (this.props.expression._type === STATEMENT_TYPES.EXPRESSION)
        return (
          <div className='Expression' onInput={this.handleInput}>
            <Input
              id={this.props.id || expression._id}
              content={expression.content}
              inline
              regex={EXPRESSION_REGEX}
              onUpdate={this.handleInputUpdate}
              onDelete={() =>
                this.props.deleteExpression({
                  id: this.props.id || expression._id,
                  path: this.state.path,
                })
              }
              onTurnIntoFunctionCall={(value) =>
                this.props.turnIntoFunctionCall({
                  path: this.state.path,
                  value,
                })
              }
            />
          </div>
        );
      else if (this.props.expression._type === STATEMENT_TYPES.FUNCTION_CALL) {
        return (
          <div className='Expression' onInput={this.handleInput}>
            <FunctionCall
              key={this.props.expression._id}
              statement={this.props.expression}
              path={this.props.path}
              stateKeys={['content']}
            />
          </div>
        );
      }
    }
  }
}

export const Expression = connect(null, {
  deleteExpression,
  turnIntoFunctionCall,
  updateValueAtPath,
  upgradeExpressionToBinary,
  upgradeExpressionWithUnaryOperator,
})(ExpressionComponent);
