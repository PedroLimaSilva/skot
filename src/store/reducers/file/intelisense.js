import { v4 as uuid } from 'uuid';
import { STATEMENT_TYPES } from '../../../features/language-support';
import { getDefaultForType } from '../../../features/language-support/defaults';

const DEFAULT_ARGS = [{ name: 'a', type: 'Number' }];

function findFunctionInState(state, functionName) {
  // TODO: do a deepSearch
  const entries = state.statements.values();
  console.log(functionName, entries);
  let next = entries.next();
  let foundMatch;
  while (!next?.done) {
    if (next.value.name === functionName) {
      foundMatch = next.value;
      break;
    }
    next = entries.next();
  }
  return foundMatch;
}

function generateExpressionFromArgs(args) {
  const expressions = [];
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    expressions.push({
      _id: uuid,
      _type: STATEMENT_TYPES.EXPRESSION,
      content: getDefaultForType(arg.type),
    });
  }
  return expressions;
}

export function getArgsForFunction(state, functionName) {
  const foundMatch = findFunctionInState(state, functionName);
  if (foundMatch?.args) {
    return generateExpressionFromArgs(foundMatch.args);
  }

  // TODO: Create function if none found
  return generateExpressionFromArgs(DEFAULT_ARGS);
}
