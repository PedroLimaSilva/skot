import { createSlice } from '@reduxjs/toolkit';

export const ifSlice = createSlice({
  name: 'if',
  initialState: {
    name: 'name',
    arguments: [{ name: 'argument', type: 'type' }],
  },
  reducers: {
    rename: (state, action) => {
      state.name = action.payload;
    },
    addArgument: (state, action) => {
      state.arguments.push(action.payload);
    },
    removeArgument: (state, action) => {
      const index = state.arguments.findIndex(
        (arg) => arg.name === action.name
      );
      state.arguments.splice(index, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { rename, addArgument, removeArgument } = ifSlice.actions;

export default ifSlice.reducer;
