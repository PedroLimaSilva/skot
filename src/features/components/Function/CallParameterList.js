import React from 'react';

import { Expression } from '../Expression';

import './index.scss';

export class CallParameterList extends React.Component {
  renderParam = (arg, i, list) => {
    return (
      <span key={`param_${i}_${this.props.id}`}>
        <Expression
          id={`${this.props.id}_param_${i}_name`}
          path={this.props.path}
          stateKeys={[this.props.stateKeys, i]}
          expression={arg}
        />
        {list && i < list.length - 1 ? ', ' : ''}
      </span>
    );
  };

  render() {
    const { list = [] } = this.props;

    return (
      <span className='ParameterList'>
        <strong>(</strong>
        {list.map(this.renderParam)}
        <strong>)</strong>
      </span>
    );
  }
}
