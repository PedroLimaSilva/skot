import { getIn, updateIn } from 'immutable';
import { v4 as uuid } from 'uuid';
import { STATEMENT_TYPES } from '../../features/language-support';
import {
  CREATE_LINE,
  DELETE_LINE,
  REMOVE_BLOCK,
  UPDATE_CONTENT,
} from '../actionTypes';
import {
  createComment,
  createLine,
  focusById,
  updateLine,
} from './BlockFactory';

const initialState = {
  id: uuid(),
  statements: [
    { id: uuid(), type: STATEMENT_TYPES.LINE, content: 'this is a line' },
    { id: uuid(), type: STATEMENT_TYPES.COMMENT, content: 'this is a comment' },
    {
      id: uuid(),
      type: STATEMENT_TYPES.FUNCTION,
      name: 'functionName',
      returnType: 'Unit',
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

export function fileReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_LINE: {
      // Create a new Line Statement inside the emitting component
      const { cursorPosition, path } = action.payload;

      const pathToParent = path.slice(0, path.length - 1);
      const indexOfCurrentLine = path[path.length - 1];

      const dispatcher = getIn(state, path);
      let newLine =
        dispatcher.type === STATEMENT_TYPES.COMMENT
          ? createComment(state, path, cursorPosition)
          : createLine(state, path, cursorPosition);

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

      const dispatcher = getIn(state, path);
      const dispatcherIndex = path[path.length - 1];

      return updateIn(state, path.slice(0, path.length - 1), (parentBlocks) => {
        switch (dispatcher.type) {
          case STATEMENT_TYPES.COMMENT:
            return [
              ...parentBlocks.slice(0, dispatcherIndex),
              { ...dispatcher, content: value },
              ...parentBlocks.slice(dispatcherIndex + 1),
            ];
          case STATEMENT_TYPES.LINE:
            return [
              ...parentBlocks.slice(0, dispatcherIndex),
              ...updateLine(dispatcher, value),
              ...parentBlocks.slice(dispatcherIndex + 1),
            ];
          default:
            console.warn('Unknown statement type, ignoring update');
            return parentBlocks;
        }
      });
    }
    case REMOVE_BLOCK: {
      const { path } = action.payload;

      const dispatcher = getIn(state, path);
      const dispatcherIndex = path[path.length - 1];
      
      return updateIn(state, path.slice(0, path.length - 1), (parentBlocks) => {
        return [
          ...parentBlocks.slice(0, dispatcherIndex),
          ...dispatcher.statements,
          ...parentBlocks.slice(dispatcherIndex + 1),
        ];;
      });
    }
    default:
      return state;
  }
}
