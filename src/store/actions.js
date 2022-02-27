import { CREATE_LINE } from './actionTypes';

export const addStatement = ({ parentId, position }) => ({
  type: CREATE_LINE,
  payload: {
    parentId,
    position,
  },
});
