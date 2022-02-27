import React from 'react';
import { Input } from '../input';
import './index.scss';

export class Line extends React.PureComponent {
  render() {
    return (
      <p className='Line'>
        <Input id={this.props.statement.id} content={this.props.statement.content} />
      </p>
    );
  }
}
