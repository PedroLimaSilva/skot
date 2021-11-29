export function getPossibleKeyword(text) {
  switch (text) {
    case 'if': {
      return 'IfClause';
    }
    default: {
      return null;
    }
  }
}
