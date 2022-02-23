import { createSlice } from '@reduxjs/toolkit';

export const STATEMENT_TYPES = {
  COMMENT: 'COMMENT',
  LINE: 'LINE',
  IF: 'IF',
};

const initialState = {
  name: 'untitled',
  statements: [
    {
      type: STATEMENT_TYPES.COMMENT,
      content: 'The following line is an incomplete statement',
    },
    { type: STATEMENT_TYPES.LINE, content: 'incomplete stateme' },
  ],
};

export const slice = createSlice({
  name: 'module',
  initialState,
  reducers: {},
});
