import { getIn, updateIn } from 'immutable';
import { v4 as uuid } from 'uuid';
import { CREATE_LINE, DELETE_LINE, UPDATE_CONTENT } from '../actionTypes';

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
    { id: uuid(), type: STATEMENT_TYPES.LINE, content: '' },
  ],
};

function focusById(id, focusPosition) {
  setTimeout(() => {
    const input = document.getElementById(id);
    const pos = focusPosition || input.value.length;
    input.setSelectionRange(pos, pos);
    input.focus();
  }, 50);
}

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

      focusById(newLine.id);

      return updateIn(state, pathToParent, (value) => [
        ...value.slice(0, indexOfCurrentLine + 1),
        newLine,
        ...value.slice(indexOfCurrentLine + 1),
      ]);
    }
    case DELETE_LINE: {
      const { id, path, value } = action.payload;

      const indexOfCurrentLine = path[path.length - 1];
      if (indexOfCurrentLine === 0) {
        return state;
      }

      const pathToParent = path.slice(0, path.length - 1);
      // checking if sibling is LINE or COMMENT
      const previousSibling = getIn(state, [
        ...pathToParent,
        indexOfCurrentLine - 1,
        'content',
      ]);
      if (previousSibling === undefined) {
        return state;
      }

      const blockToFocus = getIn(state, [
        ...pathToParent,
        indexOfCurrentLine - 1,
      ]);

      const updatedSibling = updateIn(
        state,
        [...pathToParent, indexOfCurrentLine - 1, 'content'],
        (content) => content + value
      );

      focusById(blockToFocus.id, blockToFocus.content.length);

      const removedDispatcher = updateIn(
        updatedSibling,
        pathToParent,
        (statements) => statements.filter((e) => e.id !== id)
      );

      return removedDispatcher;
    }
    case UPDATE_CONTENT: {
      const { path, value } = action.payload;
      return updateIn(state, path, (current) => value);
    }
    default:
      return state;
  }
}
