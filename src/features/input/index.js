import classNames from 'classnames';
import React from 'react';
import { isBackspace, isEnter } from '../../helpers/input';

import './index.scss';

export class Input extends React.Component {
  ref = React.createRef();
  state = { isFocused: false };

  componentDidUpdate(prevProps) {
    if (prevProps.content !== this.props.content) {
      this.ref.current.value = this.props.content;
    }
  }

  handleChange = (e) => {
    this.props.onUpdate?.(e.target.value);
  };

  handleKeydown = (e) => {
    if (isEnter(e)) {
      const cursorPosition = e.target.selectionStart;
      console.log('ENTER', cursorPosition);

      this.props.onNewLine?.(cursorPosition);
      this.props.onUpdate?.(this.ref.current.value.slice(0, cursorPosition));

      return true;
    }
    if (isBackspace(e) && this.ref.current.value === '') {
      this.props.onDelete?.();
      console.log('BACKSPACE', this.props.id);
      return true;
    }
  };

  render() {
    const { content, id } = this.props;
    return (
      <input
        ref={this.ref}
        id={id}
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
