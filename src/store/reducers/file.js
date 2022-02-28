import { updateIn } from 'immutable';
import { v4 as uuid } from 'uuid';
import { CREATE_LINE } from '../actionTypes';

export const STATEMENT_TYPES = {
  COMMENT: 'COMMENT',
  LINE: 'LINE',
  IF: 'IF',
  FUNCTION: 'FUNCTION',
};

export const STATEMENT_FACTORY = {
  [STATEMENT_TYPES.LINE]: () => ({
    id: uuid(),
    type: STATEMENT_TYPES.LINE,
    content: '',
  }),
};

const initialState = {
  id: uuid(),
  statements: [
    { id: uuid(), type: STATEMENT_TYPES.LINE, content: 'this is a line' },
    { id: uuid(), type: STATEMENT_TYPES.COMMENT, content: 'this is a comment' },
    {
      id: uuid(),
      type: STATEMENT_TYPES.FUNCTION,
      name: 'functionName',
      args: [],
      statements: [
        { id: uuid(), type: STATEMENT_TYPES.LINE, content: '' },
        {
          id: uuid(),
          type: STATEMENT_TYPES.COMMENT,
          content: 'this is a comment',
        },
        { id: uuid(), type: STATEMENT_TYPES.LINE, content: '' },
      ],
    },
  ],
};

export function fileReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_LINE: {
      // Create a new Line Statement inside the emitting component
      const { path } = action.payload;
      const pathToParent = path.slice(0, path.length - 1);
      const indexOfCurrentLine = path[path.length - 1];
      const newLine = STATEMENT_FACTORY[STATEMENT_TYPES.LINE]();

      setTimeout(() => document.getElementById(newLine.id).focus(), 50);

      return updateIn(state, pathToParent, (value) => [
        ...value.slice(0, indexOfCurrentLine + 1),
        newLine,
        ...value.slice(indexOfCurrentLine + 1),
      ]);
    }
    default:
      return state;
  }
}
