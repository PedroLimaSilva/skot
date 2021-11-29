export function getPossibleKeyword(text) {
  switch (text) {
    case 'if': {
      return 'IfClause';
    }
    case 'fun': {
      return 'FunctionBlock';
    }
    default: {
      return null;
    }
  }
}
