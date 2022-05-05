import {
  CREATE_LINE,
  UPDATE_CONTENT,
  DELETE_LINE,
  REMOVE_BLOCK,
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
