import classNames from 'classnames';
import React from 'react';
import { isBackspace, isEnter } from '../../helpers/input';

import './index.scss';

export class Input extends React.Component {
  state = { isFocused: false, value: '' };

  componentDidMount() {
    this.setState({ value: this.props.content });
  }

  handleChange = (e) => {
    console.log(e);
    this.setState({ value: e.target.value });
    this.props.onUpdate?.(e.target.value);
    // this.props.updateInput({ content: e.target.value });
  };

  handleKeydown = (e) => {
    if (isEnter(e)) {
      console.log('ENTER', this.props.id);
      this.props.onNewLine?.()
      return true;
    }
    if (isBackspace(e) && this.state.value === '') {
      this.props.onDelete?.();
      console.log('BACKSPACE', this.props.id);
      return true;
    }
  };

  render() {
    const { content } = this.props;
    return (
      <input
        className={classNames('Input', { focused: this.state.isFocused })}
        defaultValue={content}
        tabIndex={0}
        onKeyDown={this.handleKeydown}
        onChange={this.handleChange}
        onFocus={() => this.setState({ isFocused: true })}
        onBlur={() => this.setState({ isFocused: false })}
      />
    );
  }
}
