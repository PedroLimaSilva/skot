import { Component } from 'react';
import { Input } from '../Input';

import './index.scss';

/**
 * TO DO use this in return statements, if, right side of attributions, either side of *+-/
 */
export class Expression extends Component {
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
      return <Input content={expression.content} inline />;
    }
  }
}
