import { Component } from 'react';
import { Input } from '../Input';

import './index.scss';

const EXPRESSION_REGEX = /[a-zA-Z1-9()_$]+/gm;

/**
 * TO DO use this in return statements, if, right side of attributions, either side of *+-/
 */
export class Expression extends Component {
  handleInput = (e) => {
    console.log('Expression', e);
  };

  render() {
    const { expression } = this.props;
    if (Array.isArray(expression.content)) {
      return (
        <div className='Expression'>
          {expression.content[1] && (
            <Expression expression={expression.content[0]} />
          )}
          <strong>{expression.operator} </strong>
          <Expression expression={expression.content[1]} />
        </div>
      );
    } else {
      return (
        <div className='Expression' onInput={this.handleInput}>
          <Input content={expression.content} inline regex={EXPRESSION_REGEX} />
        </div>
      );
    }
  }
}
