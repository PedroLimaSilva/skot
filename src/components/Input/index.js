import classNames from 'classnames';
import React from 'react';
import {
  getHorizontalDirection,
  getSelection,
  isBackspace,
  isCharacter,
  isEnter,
  isHorizontalArrow,
} from '../../helpers/input';
import { clamp } from '../../helpers/math';

import './index.scss';

export class Input extends React.PureComponent {
  ref = React.createRef();
  state = {
    text: '',
    indicatorPosition: 0,
  };

  componentDidMount() {
    this.ref.current.focus();
  }

  getSnapshotBeforeUpdate(prevProps){
    if(!prevProps.isFocused && this.props.isFocused){
      this.ref.current.focus();
    }
    return null;
  }

  handleBackSpace() {
    const { text, indicatorPosition } = this.state;

    if (text === '') {
      this.props.removeSelf();
    }

    const selection = getSelection();

    if (selection.text !== '' && text.includes(selection.text)) {
      const newText =
        text.slice(0, selection.start) + text.slice(selection.end);

      this.setState({
        text: newText,
        indicatorPosition: clamp(selection.start, 0, newText.length),
      });
    } else {
      this.setState({
        text:
          text.slice(0, indicatorPosition - 1) + text.slice(indicatorPosition),
        indicatorPosition: clamp(indicatorPosition - 1, 0, text.length - 1),
      });
    }
  }

  handleCharacter(e) {
    const { text, indicatorPosition } = this.state;

    const selection = getSelection();

    if (selection.text !== '' && text.includes(selection.text)) {
      const newText =
        text.slice(0, selection.start) + e.key + text.slice(selection.end);

      this.setState({
        text: newText,
        indicatorPosition: clamp(selection.start + 1, 0, newText.length),
      });
    } else {
      this.setState({
        text: text.splice(indicatorPosition, 0, e.key),
        indicatorPosition: indicatorPosition + 1,
      });
    }
  }

  handleKey = (e) => {
    if (this.props.isFocused) {
      e.stopPropagation();
      const { text, indicatorPosition } = this.state;

      if (isCharacter(e)) {
        this.handleCharacter(e);
      } else if (isBackspace(e)) {
        this.handleBackSpace();
      } else if (isHorizontalArrow(e)) {
        const direction = getHorizontalDirection(e);

        this.setState({
          indicatorPosition: clamp(
            indicatorPosition + direction,
            0,
            text.length
          ),
        });
      } else if (isEnter(e)) {
        this.props.handleEnter();
      }
    }
  };

  render() {
    return (
      <div
        className={classNames('Input', { focused: this.props.isFocused })}
        ref={this.ref}
        onClick={this.props.handleClick}
        onKeyDown={this.handleKey}
        tabIndex='0'
      >
        {this.state.text}
        <div
          className='Input-cursor'
          style={{ left: `${this.state.indicatorPosition / 2}em` }}
        >
          |
        </div>
      </div>
    );
  }
}
