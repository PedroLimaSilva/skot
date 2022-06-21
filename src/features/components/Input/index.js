import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import {
  getHorizontalDirection,
  getVerticalDirection,
  isBackspace,
  isEnter,
  isHorizontalArrow,
  isVerticalArrow,
} from '../../../helpers/input';

import './index.scss';

export function findFocusIndex(target) {
  const focusableItems = document.querySelectorAll('input, select');
  for (let i = 0, len = focusableItems.length; i < len; i++) {
    if (focusableItems[i] === target) {
      return i;
    }
  }
  return -1;
}

export class Input extends React.Component {
  // TODO: On blur, if the value is '', then fill the input with a defaultValue given by the parent;

  ref = React.createRef();
  state = { isFocused: false, width: '100%' };

  componentDidMount() {
    if (this.props.inline) {
      this.setState({ width: `${this.props.content.length * 0.7}em` });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.content !== this.props.content) {
      this.ref.current.value = this.props.content;
      if (this.props.inline) {
        this.setState({ width: `${this.ref.current?.value.length * 0.7}em` });
      }
    }
  }

  handleInput = (e) => {
    const inputValue = e.target.value;
    if (inputValue && this.props.regex) {
      const match = inputValue.match(this.props.regex) || '';
      const newValue = ''.concat(...match);
      e.target.value = newValue;
      if (inputValue === newValue) {
        e.preventDefault();
        e.stopPropagation();
      }
    } else {
      e.stopPropagation();
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
      this.props.onDeleteLine?.(this.props.id, e.target.value);
      return true;
    }
    if (isHorizontalArrow(e)) {
      const direction = getHorizontalDirection(e);
      const currentFocusIndex = findFocusIndex(e.target);
      const focusableItems = document.querySelectorAll('input, select');

      if (direction === -1 && cursorPosition === 0 && currentFocusIndex > 0) {
        const newTarget = focusableItems[currentFocusIndex + direction];
        newTarget.focus();
        setTimeout(() =>
          newTarget.setSelectionRange?.(0, newTarget.value.length, 'backward')
        );
      } else if (
        direction === 1 &&
        cursorPosition === e.target.value.length &&
        currentFocusIndex < focusableItems.length - 1
      ) {
        const newTarget = focusableItems[currentFocusIndex + direction];
        newTarget.focus();
        setTimeout(() =>
          newTarget.setSelectionRange?.(0, newTarget.value.length, 'forward')
        );
      }
    }
    if (isVerticalArrow(e)) {
      const direction = getVerticalDirection(e);
      const currentFocusIndex = findFocusIndex(e.target);
      const focusableItems = document.querySelectorAll('input, select');

      if (direction === -1 && currentFocusIndex > 0) {
        const newTarget = focusableItems[currentFocusIndex + direction];
        newTarget.focus();
        setTimeout(() =>
          newTarget.setSelectionRange?.(0, newTarget.value.length, 'backward')
        );
      } else if (
        direction === 1 &&
        currentFocusIndex < focusableItems.length - 1
      ) {
        const newTarget = focusableItems[currentFocusIndex + direction];
        newTarget.focus();
        setTimeout(() =>
          newTarget.setSelectionRange?.(0, newTarget.value.length, 'forward')
        );
      }
    }
    return true;
  };

  handleChange = (e) => {
    this.props.onUpdate?.(e.target.value);
    if (this.props.inline) {
      this.setState({ width: `${e.target.value.length * 0.65}em` });
    }
  };

  render() {
    const { alignRight, content, id } = this.props;
    return (
      <input
        ref={this.ref}
        id={id}
        style={{ width: this.state.width }}
        className={classNames('Input', {
          alignRight,
          focused: this.state.isFocused,
        })}
        autoComplete={"off"}
        defaultValue={content}
        tabIndex={0}
        onKeyDown={this.handleKeydown}
        onChange={this.handleChange}
        onInput={this.handleInput}
        onFocus={() => this.setState({ isFocused: true })}
        onBlur={() => this.setState({ isFocused: false })}
      />
    );
  }
}

Input.propTypes = {
  alignRight: PropTypes.bool,
  content: PropTypes.string,
  id: PropTypes.string,
  inline: PropTypes.bool,
  onNewLine: PropTypes.func,
  onUpdate: PropTypes.func,
  regex: PropTypes.instanceOf(RegExp),
};
