import { findFocusIndex, Input } from '.';
import {
  FOCUSABLE_ITEMS_QUERY,
  getHorizontalDirection,
  isHorizontalArrow,
} from '../../../helpers/input';

import './select.scss';

export class Select extends Input {
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
    }
  };

  render() {
    const { id, defaultValue, options } = this.props;
    return (
      <select
        id={id}
        className='Select'
        defaultValue={defaultValue}
        onKeyDown={this.handleKeydown}
      >
        {options.map((op) => (
          <option key={`option_${op}`} value={op}>
            {op}
          </option>
        ))}
      </select>
    );
  }
}
