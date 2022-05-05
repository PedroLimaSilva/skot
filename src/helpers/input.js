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
