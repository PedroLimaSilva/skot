import { CREATE_LINE, DELETE_LINE } from './actionTypes';

export const createLine = ({ path }) => ({
  type: CREATE_LINE,
  payload: {
    path,
  },
});

export const deleteLine = ({ path }) => ({
  type: DELETE_LINE,
  payload: {
    path,
  },
});
