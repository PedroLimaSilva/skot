import { Component } from 'react';
import { Input } from '../Input';
import { BinaryExpression } from './BinaryExpression';

/**
 * TO DO use this in return statements, if, right side of attributions, either side of *+-/
 */
export class Expression extends Component {
  render() {
    const { expression } = this.props;
    if (Array.isArray(expression.content)) {
      return <BinaryExpression expression={expression}/>;
    } else {
      return <Input content={expression.content} />;
    }
  }
}
