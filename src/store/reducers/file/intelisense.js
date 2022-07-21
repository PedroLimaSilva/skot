const DEFAULT_ARGS = [{ name: 'a', type: 'Number' }];

function findFunctionInState(state, functionName) {
  // TODO: do a deepSearch
  const entries = state.statements.values();
  console.log(functionName, entries);
  let next = entries.next();
  let foundMatch;
  while (!next?.done) {
    console.log(next);
    if (next.value.name === functionName) {
      foundMatch = next.value;
      break;
    }
    next = entries.next();
  }
  return foundMatch;
}

export function getArgsForFunction(state, functionName) {
  const foundMatch = findFunctionInState(state, functionName);
  if (foundMatch?.args) {
    return foundMatch.args;
  }

  // TODO: Create function if none found
  return DEFAULT_ARGS;
}
