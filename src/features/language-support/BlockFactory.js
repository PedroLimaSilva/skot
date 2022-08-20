import { getIn } from 'immutable';
import { KEYSTROKE_MAP, STATEMENT_FACTORY, STATEMENT_TYPES } from '.';

export function focusById(id, focusPosition = 0, focusSpan, timeout = 0) {
  // TODO: Allow to select whole content
  setTimeout(() => {
    try {
      const input = document.getElementById(id);
      input.focus();
      input.setSelectionRange?.(
        focusPosition,
        focusPosition + (isNaN(focusSpan) ? input.value.length : focusSpan),
        'forward'
      );
    } catch (e) {
      console.error(e, id);
    }
  }, timeout);
}

export function createComment(state, path, cursorPosition) {
  return STATEMENT_FACTORY[STATEMENT_TYPES.COMMENT](
    getIn(state, path).content.slice(cursorPosition)
  );
}

export function createLine(state, path, cursorPosition) {
  return STATEMENT_FACTORY[STATEMENT_TYPES.LINE](
    getIn(state, path).content.slice(cursorPosition)
  );
}

export function updateLine(dispatcher, value) {
  const factory = KEYSTROKE_MAP[window.__LANGUAGE_SUPPORT.language][value];
  if (factory) {
    const product = factory();
    focusById(product.focusTarget);
    return product.newBlocks;
  }
  return [{ ...dispatcher, content: value }];
}
