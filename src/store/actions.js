import {
  CREATE_LINE,
  UPDATE_CONTENT,
  DELETE_DECLARATION,
  DELETE_LINE,
  REMOVE_BLOCK,
  UPGRADE_EXPRESSION_TO_BINARY,
  UPGRADE_EXPRESSION_WITH_UNARY_OPERATOR,
  UPGRADE_LINE_TO_ASSIGNMENT,
  UPDATE_VALUE_AT_PATH,
  UPDATE_FUNCTION,
} from './actionTypes';

export const createLine = ({ cursorPosition, path }) => ({
  payload: {
    cursorPosition,
    path,
  },
  type: CREATE_LINE,
});

/**
 * Used for code blocks that have string content
 * (i.e: Lines and Comments)
 * @param {Array<string|number>, string} param0
 * @returns
 */
export const updateContent = ({ path, value }) => ({
  payload: {
    path,
    value,
  },
  type: UPDATE_CONTENT,
});

export const deleteLine = ({ id, path, value }) => ({
  payload: {
    id,
    path,
    value,
  },
  type: DELETE_LINE,
});

export const removeBlock = ({ path }) => ({
  payload: {
    path,
  },
  type: REMOVE_BLOCK,
});

export const updateFunction = ({ path, value, focusTarget }) => ({
  payload: {
    focusTarget,
    path,
    value,
  },
  type: UPDATE_FUNCTION,
});

export const updateValueAtPath = ({ path, value }) => ({
  // TODO: Merge with updateExpression
  payload: {
    path,
    value,
  },
  type: UPDATE_VALUE_AT_PATH,
});

export const upgradeLineToAssignment = ({ path, value }) => ({
  payload: {
    path,
    value,
  },
  type: UPGRADE_LINE_TO_ASSIGNMENT,
});

export const upgradeExpressionToBinary = ({
  focusTarget,
  operator,
  path,
  value,
}) => ({
  payload: {
    focusTarget,
    operator,
    path,
    value,
  },
  type: UPGRADE_EXPRESSION_TO_BINARY,
});

export const upgradeExpressionWithUnaryOperator = ({
  path,
  value,
  focusTarget,
}) => ({
  payload: {
    focusTarget,
    path,
    value,
  },
  type: UPGRADE_EXPRESSION_WITH_UNARY_OPERATOR,
});

export const deleteDeclaration = ({ id, path, value }) => ({
  payload: {
    id,
    path,
    value,
  },
  type: DELETE_DECLARATION,
});
