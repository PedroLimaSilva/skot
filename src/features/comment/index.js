import React from 'react';
import { Input } from '../input';
import './index.scss';

export class Comment extends React.PureComponent {
  render() {
    return (
      <p className='Comment'>
        {'//'}{' '}
        <Input
          id={this.props.statement.id}
          content={this.props.statement.content}
        />
      </p>
    );
  }
}
