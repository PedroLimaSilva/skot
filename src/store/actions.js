import {
  CREATE_LINE,
  UPDATE_CONTENT,
  DELETE_LINE,
  REMOVE_BLOCK,
  UPDATE_FUNCTION,
} from './actionTypes';

export const createLine = ({ cursorPosition, path }) => ({
  type: CREATE_LINE,
  payload: {
    cursorPosition,
    path,
  },
});

/**
 * Used for code blocks that have string content
 * (i.e: Lines and Comments)
 * @param {Array<string|number>, string} param0
 * @returns
 */
export const updateContent = ({ path, value }) => ({
  type: UPDATE_CONTENT,
  payload: {
    path,
    value,
  },
});

export const deleteLine = ({ id, path, value }) => ({
  type: DELETE_LINE,
  payload: {
    id,
    path,
    value,
  },
});

export const removeBlock = ({ path }) => ({
  type: REMOVE_BLOCK,
  payload: {
    path,
  },
});

export const updateFunction = ({ path, value, focusTarget }) => ({
  type: UPDATE_FUNCTION,
  payload: {
    path,
    value,
    focusTarget,
  },
});
