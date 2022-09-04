import React from 'react';
import { connect } from 'react-redux';
import {
  FOCUSABLE_ITEMS_QUERY,
  getHorizontalDirection,
  getVerticalDirection,
  isEnter,
  isHorizontalArrow,
  isVerticalArrow,
} from '../../../helpers/input';

import { createLineAfter } from '../../../store/actions';

import { CodeBlock } from '../CodeBlock';
import { findFocusIndex } from '../Input';
import './index.scss';

class LineCreator extends CodeBlock {
  // TODO: LineCreator before

  handleKeydown = (e) => {
    if (isHorizontalArrow(e)) {
      const direction = getHorizontalDirection(e);
      const currentFocusIndex = findFocusIndex(e.target);
      const focusableItems = document.querySelectorAll(FOCUSABLE_ITEMS_QUERY);

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
    } else if (isVerticalArrow(e)) {
      const direction = getVerticalDirection(e);
      const currentFocusIndex = findFocusIndex(e.target);
      const focusableItems = document.querySelectorAll(FOCUSABLE_ITEMS_QUERY);

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
    if (isEnter(e)) {
      this.handleInput(e);
    }
  };

  handleInput = (e) => {
    // TODO do the same on ENTER
    this.props.createLineAfter({
      path: this.state.path,
      value: e.target.value,
    });
    e.target.value = '';
  };

  render() {
    return (
      <input
        className='LineCreator'
        onKeyDown={this.handleKeydown}
        onInput={this.handleInput}
        tabIndex={0}
      />
    );
  }
}

export default connect(null, { createLineAfter })(LineCreator);
