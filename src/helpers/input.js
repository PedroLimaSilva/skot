export function isBackspace(event) {
  return event.code === 'Backspace';
}

export function isCharacter(event) {
  return event.key.length === 1 && !(event.ctrlKey || event.metaKey);
}

export function isHorizontalArrow(event) {
  return event.key === 'ArrowLeft' || event.key === 'ArrowRight';
}

export function isVerticalArrow(event) {
  return event.key === 'ArrowUp' || event.key === 'ArrowDown';
}

export function isEnter(event) {
  return event.code === 'Enter';
}

export function isTab(event) {
  return event.code === 'Tab';
}

export function isInputValid(regex, text) {
  if (!regex || !text) {
    return true;
  }
  const matches = text.match(regex);
  if (!matches || matches.length === 0) {
    return false;
  }
  let matchCoverage = 0;
  for (let i = 0, len = matches.length; i < len; i++) {
    matchCoverage += matches[i].length;
  }
  return matchCoverage === text.length;
}

export function getHorizontalDirection(event) {
  if (isHorizontalArrow(event)) {
    return event.key === 'ArrowLeft' ? -1 : 1;
  }
  return 0;
}

export function getVerticalDirection(event) {
  if (isVerticalArrow(event)) {
    return event.key === 'ArrowUp' ? -1 : 1;
  }
  return 0;
}

export function getSelection() {
  const selection = document.getSelection();

  const text = selection?.focusNode?.textContent.substring(
    selection.baseOffset,
    selection.extentOffset
  );

  // console.log(text);
  return {
    end: selection.extentOffset,
    start: selection.baseOffset,
    text,
  };
}

/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 *
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
function getTextWidth(text, font) {
  // re-use canvas object for better performance
  const canvas =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement('canvas'));
  const context = canvas.getContext('2d');
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}

// https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript
function getCssStyle(element, prop) {
  return window.getComputedStyle(element, null).getPropertyValue(prop);
}
// https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript
function getCanvasFont(el = document.body) {
  const fontWeight = getCssStyle(el, 'font-weight') || 'normal';
  const fontSize = getCssStyle(el, 'font-size') || '16px';
  const fontFamily = getCssStyle(el, 'font-family') || 'Times New Roman';

  return `${fontWeight} ${fontSize} ${fontFamily}`;
}

export function getElementTextWidth(el) {
  const font = getCanvasFont(el);
  const str = el.textContent || el.value;
  return getTextWidth(str, font);
}
