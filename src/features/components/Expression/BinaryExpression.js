import { Component } from 'react';
import { Expression } from '.';

export class BinaryExpression extends Component {
  render() {
    const { content } = this.props;
    return <div>{'work in progress'}</div>;
    return <Expression content={content} />;
  }
}
