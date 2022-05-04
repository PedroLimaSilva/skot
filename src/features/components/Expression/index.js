import { Component } from 'react';
import { Input } from '../Input';

/**
 * TO DO use this in return statements, if, right side of attributions, either side of *+-/
 */
export class Expression extends Component {
  render() {
    const { content } = this.props;
    return <Input content={content} />;
  }
}
