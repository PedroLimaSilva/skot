import React from 'react';

import { Input } from '../Input';

import './index.scss';

// eslint-disable-next-line no-useless-escape
const PARAMETER_NAME_REGEX = /[a-zA-Z_$]+/gm;

const TYPE_REGEX = /([A-Z][a-zA-Z]*)/gm;

export class ParameterList extends React.Component {
  handleNameChange(value, i, focusTarget) {
    if (i >= 0) {
      this.props.onUpdate(i, 'name', value, focusTarget);
    }
  }

  handleTypeChange(value, i, focusTarget) {
    if (i >= 0) {
      this.props.onUpdate(i, 'type', value, focusTarget);
    }
  }

  renderParam = ({ name, type }, i, list) => {
    return (
      <span key={`param_${i}_${this.props.id}`}>
        <Input
          id={`${this.props.id}_param_${i}_name`}
          inline
          alignRight
          content={name}
          regex={PARAMETER_NAME_REGEX}
          onUpdate={(value) =>
            this.handleNameChange(value, i, `${this.props.id}_param_${i}_name`)
          }
        />
        {': '}
        <Input
          inline
          id={`${this.props.id}_param_${i}_type`}
          content={type}
          regex={TYPE_REGEX}
          onUpdate={(e) =>
            this.handleTypeChange(e, i, `${this.props.id}_param_${i}_type`)
          }
        />
        {list && i < list.length - 1 ? ', ' : ''}
      </span>
    );
  };

  render() {
    const { list = [] } = this.props;
    const newArg = { name: '', type: '' };

    return (
      <span className='ParameterList'>
        <strong>(</strong>
        {list.map(this.renderParam)}
        <span className='placeholder'>
          {this.renderParam(newArg, list.length)}
        </span>
        <strong>): </strong>
      </span>
    );
  }
}
