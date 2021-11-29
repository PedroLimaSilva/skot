export function isBackspace(event) {
  return event.code === 'Backspace';
}

export function isCharacter(event) {
  return event.key.length === 1 && !(event.ctrlKey || event.metaKey);
}

export function isHorizontalArrow(event) {
  return event.code === 'ArrowLeft' || event.code === 'ArrowRight';
}

export function isVerticalArrow(event) {
  return event.code === 'ArrowUp' || event.code === 'ArrowDown';
}

export function isEnter(event) {
  return event.code === 'Enter';
}

export function isTab(event) {
  return event.code === 'Tab';
}

export function getHorizontalDirection(event) {
  if (isHorizontalArrow(event)) {
    return event.code === 'ArrowLeft' ? -1 : 1;
  }
  return 0;
}

export function getVerticalDirection(event) {
  if (isVerticalArrow(event)) {
    return event.code === 'ArrowUp' ? -1 : 1;
  }
  return 0;
}

export function getSelection() {
  const selection = document.getSelection();

  const text = selection?.focusNode?.textContent.substring(
    selection.baseOffset,
    selection.extentOffset
  );

  console.log(text);
  return {
    text,
    start: selection.baseOffset,
    end: selection.extentOffset,
  };
}
