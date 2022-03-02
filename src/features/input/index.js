import classNames from 'classnames';
import React from 'react';
import { isBackspace, isEnter } from '../../helpers/input';

import './index.scss';

export class Input extends React.Component {
  ref = React.createRef();
  state = { isFocused: false, width: '100%' };

  componentDidMount() {
    if (this.props.inline) {
      this.setState({ width: `${this.ref.current?.value.length * 0.65}em` });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.content !== this.props.content) {
      this.ref.current.value = this.props.content;
      if (this.props.inline) {
        this.setState({ width: `${this.ref.current?.value.length * 0.65}em` });
      }
    }
  }

  handleInput = (e) => {
    this.props.onUpdate?.(e.target.value);
    if (this.props.inline) {
      this.setState({ width: `${e.target.value.length * 0.65}em` });
    }
  };

  handleKeydown = (e) => {
    const cursorPosition = e.target.selectionStart;
    if (isEnter(e)) {
      console.log('ENTER', cursorPosition);

      this.props.onNewLine?.(cursorPosition);
      this.props.onUpdate?.(this.ref.current.value.slice(0, cursorPosition));

      return true;
    }
    if (isBackspace(e) && cursorPosition === 0) {
      this.props.onDelete?.();
      console.log('BACKSPACE', this.props.id);
      this.props.onDeleteLine?.(this.props.id, e.target.value);
      return true;
    }
  };

  render() {
    const { content, id } = this.props;
    return (
      <input
        ref={this.ref}
        id={id}
        style={{ width: this.state.width }}
        className={classNames('Input', { focused: this.state.isFocused })}
        defaultValue={content}
        tabIndex={0}
        onKeyDown={this.handleKeydown}
        onInput={this.handleInput}
        onFocus={() => this.setState({ isFocused: true })}
        onBlur={() => this.setState({ isFocused: false })}
      />
    );
  }
}
