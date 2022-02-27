import { v4 as uuid } from 'uuid';
import { CREATE_LINE } from '../actionTypes';

export const STATEMENT_TYPES = {
  COMMENT: 'COMMENT',
  LINE: 'LINE',
  IF: 'IF',
  FUNCTION: 'FUNCTION',
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
      const { content, id } = action.payload;
      console.log(content, id);
      return state;
    }
    default:
      return state;
  }
}

// eslint-disable-next-line no-unused-vars
const exampleState = {
  id: uuid(),
  statements: [
    { id: uuid(), type: 'Line', content: '' },
    { id: uuid(), type: 'Comment', content: 'this is a comment' },
    {
      id: uuid(),
      type: 'Function',
      name: 'functionName',
      args: [],
      returnType: 'Unit',
      statements: [
        { id: uuid(), type: 'Line', content: '' },
        { id: uuid(), type: 'Comment', content: 'this is a comment' },
      ],
    },
  ],
};

console.log('example state', exampleState);
