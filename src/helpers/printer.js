export const PRINTER_EMPTY = () => '';

export function getIndent(indentations) {
  if (!indentations) {
    return '';
  }
  let indent = '';
  for (let i = 0; i < indentations; i++) {
    indent += ' ';
  }
  return indent;
}
