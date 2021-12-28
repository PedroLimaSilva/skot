import classNames from 'classnames';
import React from 'react';
import {
  getHorizontalDirection,
  getSelection,
  isBackspace,
  isCharacter,
  isEnter,
  isHorizontalArrow,
  isInputValid,
  isTab,
} from '../../helpers/input';
import { getPossibleKeyword } from '../../helpers/keywords';
import { clamp } from '../../helpers/math';

import './index.scss';

export class Input extends React.PureComponent {
  ref = React.createRef();
  state = {
    text: '',
    indicatorPosition: 0,
    isValid: true,
  };

  componentDidMount() {
    this.ref.current.focus();
    this.props.setOnGetCode(this.getCode);
  }

  componentDidUpdate(prevProps, prevState){
    if(!prevProps.reloadPrinter && this.props.reloadPrinter){
      this.props.setOnGetCode(this.getCode);
    }
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (!prevProps.isFocused && this.props.isFocused) {
      this.ref.current.focus();
    }

    if (
      this.props.regex &&
      this.state.text &&
      prevState.text !== this.state.text
    ) {
      if (isInputValid(this.props.regex, this.state.text)) {
        this.setState({ isValid: true });
      } else {
        this.setState({ isValid: false });
      }
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
    e.preventDefault();
    // console.log(e);
    if (this.props.isFocused) {
      const { text, indicatorPosition } = this.state;

      if (isCharacter(e)) {
        this.handleCharacter(e);
        e.stopPropagation();
      } else if (isBackspace(e)) {
        this.handleBackSpace();
        e.stopPropagation();
      } else if (isHorizontalArrow(e)) {
        const direction = getHorizontalDirection(e);

        this.setState({
          indicatorPosition: clamp(
            indicatorPosition + direction,
            0,
            text.length
          ),
        });
        e.stopPropagation();
      } else if (isEnter(e) || isTab(e)) {
        const possibleKeyword = getPossibleKeyword(this.state.text);
        if (possibleKeyword) {
          this.props.onKeywordTyped(possibleKeyword);
        } else {
          if (isEnter(e)) {
            this.props.handleEnter();
            e.stopPropagation();
          }
        }
      }
    }
  };

  getCode = () => {
    return this.state.text;
  };

  render() {
    const { className, isFocused, handleClick } = this.props;
    const { text, isValid, indicatorPosition } = this.state;
    return (
      <div
        className={classNames(
          'Input',
          { focused: isFocused, invalid: !isValid },
          className
        )}
        ref={this.ref}
        onClick={handleClick}
        onKeyDown={this.handleKey}
        tabIndex='0'
      >
        {text}
        <div
          className='Input-cursor'
          style={{ left: `${indicatorPosition / 2}em` }}
        />
      </div>
    );
  }
}
