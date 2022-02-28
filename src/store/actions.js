import { CREATE_LINE, UPDATE_CONTENT, DELETE_LINE } from './actionTypes';

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
    path: [...path, 'content'],
    value,
  },
});

export const deleteLine = ({ path }) => ({
  type: DELETE_LINE,
  payload: {
    path,
  },
});
