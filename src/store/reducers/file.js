import { getIn, updateIn } from 'immutable';
import { v4 as uuid } from 'uuid';
import { CREATE_LINE, UPDATE_CONTENT } from '../actionTypes';

export const STATEMENT_TYPES = {
  COMMENT: 'COMMENT',
  LINE: 'LINE',
  IF: 'IF',
  FUNCTION: 'FUNCTION',
};

export const STATEMENT_FACTORY = {
  [STATEMENT_TYPES.LINE]: (content = '') => ({
    id: uuid(),
    type: STATEMENT_TYPES.LINE,
    content,
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
      const { cursorPosition, path } = action.payload;
      const pathToParent = path.slice(0, path.length - 1);
      const indexOfCurrentLine = path[path.length - 1];
      const newLine = STATEMENT_FACTORY[STATEMENT_TYPES.LINE](
        getIn(state, path).content.slice(cursorPosition)
      );

      setTimeout(() => {
        const input = document.getElementById(newLine.id);
        input.setSelectionRange(0, 0);
        input.focus();
      }, 50);

      return updateIn(state, pathToParent, (value) => [
        ...value.slice(0, indexOfCurrentLine + 1),
        newLine,
        ...value.slice(indexOfCurrentLine + 1),
      ]);
    }
    case UPDATE_CONTENT: {
      const { path, value } = action.payload;
      return updateIn(state, path, (current) => value);
    }
    default:
      return state;
  }
}
