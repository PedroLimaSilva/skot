import { getIn, updateIn } from 'immutable';
import { v4 as uuid } from 'uuid';
import {
  STATEMENT_FACTORY,
  STATEMENT_TYPES,
} from '../../../features/language-support';
import {
  CREATE_LINE,
  DELETE_LINE,
  REMOVE_BLOCK,
  UPDATE_CONTENT,
  UPDATE_VALUE_AT_PATH,
  UPDATE_FUNCTION,
  UPGRADE_EXPRESSION_TO_BINARY,
  UPGRADE_EXPRESSION_WITH_UNARY_OPERATOR,
  UPGRADE_LINE_TO_ASSIGNMENT,
  TURN_INTO_FUNCTION_CALL,
  CREATE_LINE_AFTER,
} from '../../actionTypes';
import {
  createComment,
  createLine,
  focusById,
  updateLine,
} from '../../../features/language-support/BlockFactory.js';

import { initialState } from './initialState';
import { getArgsForFunction } from './intelisense';

export function fileReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_LINE: {
      // Create a new Line Statement inside the emitting component
      const { cursorPosition, path } = action.payload;

      const pathToParent = path.slice(0, path.length - 1);
      const indexOfCurrentLine = path[path.length - 1];

      const dispatcher = getIn(state, path);
      const newLine =
        dispatcher.type === STATEMENT_TYPES.COMMENT
          ? createComment(state, path, cursorPosition)
          : createLine(state, path, cursorPosition);

      focusById(newLine._id);

      return updateIn(state, pathToParent, (value) => [
        ...value.slice(0, indexOfCurrentLine + 1),
        newLine,
        ...value.slice(indexOfCurrentLine + 1),
      ]);
    }
    case CREATE_LINE_AFTER: {
      // Create a new Line Statement inside the emitting component
      const { path, value } = action.payload;

      const pathToParent = path.slice(0, path.length - 2);
      const indexOfDispatcherStatement = path[path.length - 2];

      const newLine = STATEMENT_FACTORY.LINE(value);
      focusById(newLine._id, value.length + 1, 0);

      return updateIn(state, pathToParent, (value) => [
        ...value.slice(0, indexOfDispatcherStatement + 1),
        newLine,
        ...value.slice(indexOfDispatcherStatement + 1),
      ]);
    }
    case DELETE_LINE: {
      const { id, path, value } = action.payload;

      console.log({ id, path, value });

      const indexOfCurrentLine = path[path.length - 1];
      if (indexOfCurrentLine === 0) {
        return state;
      }

      const pathToParent = path.slice(0, path.length - 1);
      // checking if sibling is LINE or COMMENT
      const previousSiblingType = getIn(state, [
        ...pathToParent,
        indexOfCurrentLine - 1,
        '_type',
      ]);

      let updatedSibling;
      if (
        previousSiblingType === STATEMENT_TYPES.COMMENT ||
        previousSiblingType === STATEMENT_TYPES.LINE
      ) {
        updatedSibling = updateIn(
          state,
          [...pathToParent, indexOfCurrentLine - 1, 'content'],
          (content) => content + value
        );
      } else {
        updatedSibling = updateIn(
          state,
          [...pathToParent, indexOfCurrentLine - 1],
          (content) => content // Do nothing
        );
        console.log(updatedSibling);
      }

      const blockToFocus = getIn(state, [
        ...pathToParent,
        indexOfCurrentLine - 1,
      ]);

      focusById(blockToFocus._id);

      const removedDispatcher = updateIn(
        updatedSibling,
        pathToParent,
        (statements) => statements.filter((e) => e._id !== id)
      );

      return removedDispatcher;
    }
    case UPDATE_CONTENT: {
      const { path, value } = action.payload;

      const dispatcher = getIn(state, path);
      const dispatcherIndex = path[path.length - 1];

      return updateIn(state, path.slice(0, path.length - 1), (parentBlocks) => {
        switch (dispatcher._type) {
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
        ];
      });
    }
    case UPDATE_FUNCTION: {
      const { path, value, focusTarget } = action.payload;
      if (
        path.includes('args') &&
        path[path.length - 2] >=
          getIn(state, path.slice(0, path.length - 2)).length
      ) {
        focusById(focusTarget);
        return updateIn(state, path.slice(0, path.length - 2), (args) => {
          return [
            ...args,
            { name: 'name', type: 'Type', [path[path.length - 1]]: value },
          ];
        });
      } else if (path.includes('args') && value === '') {
        const removedArgIndex = path[path.length - 2];
        return updateIn(state, path.slice(0, path.length - 2), (args) => {
          return [
            ...args.slice(0, removedArgIndex),
            ...args.slice(removedArgIndex + 1),
          ];
        });
      } else {
        return updateIn(state, path, () => value);
      }
    }
    case UPDATE_VALUE_AT_PATH: {
      const { path, value } = action.payload;
      return updateIn(state, path, () => value);
    }
    case UPGRADE_EXPRESSION_TO_BINARY: {
      const { path, operator, value, focusTarget } = action.payload;
      focusById(focusTarget);
      return updateIn(state, path, (e) => {
        return {
          _id: e._id,
          _type: STATEMENT_TYPES.BINARY_EXPRESSION,
          content: [
            {
              _id: uuid(),
              _type: STATEMENT_TYPES.EXPRESSION,
              content: value,
            },
            {
              _id: uuid(),
              _type: STATEMENT_TYPES.EXPRESSION,
              content: '0',
            },
          ],
          operator,
        };
      });
    }
    case UPGRADE_EXPRESSION_WITH_UNARY_OPERATOR: {
      return state;
    }
    case UPGRADE_LINE_TO_ASSIGNMENT: {
      const { path, value } = action.payload;
      const focusTarget = uuid();
      focusById(focusTarget);
      return updateIn(state, path, (line) => ({
        _id: line._id,
        _type: STATEMENT_TYPES.ASSIGNMENT,
        content: {
          _id: focusTarget,
          _type: STATEMENT_TYPES.EXPRESSION,
          content: '0',
        },
        referenceTo: value.trim(),
      }));
    }
    case TURN_INTO_FUNCTION_CALL: {
      const { path, value } = action.payload;

      return updateIn(state, path, (dispatcher) => {
        focusById(`${dispatcher._id}_param_0_name`);
        return {
          _id: dispatcher._id,
          _type: STATEMENT_TYPES.FUNCTION_CALL,
          args: getArgsForFunction(state, value), // TODO: USE EXPRESSIONS AS ARGUMENTS
          functionName: value,
        };
      });
    }
    default:
      return state;
  }
}
