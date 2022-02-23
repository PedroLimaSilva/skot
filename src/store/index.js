import { configureStore } from '@reduxjs/toolkit';

import { slice as statementBlockSlice } from '../features/statement-block/slice';

export default configureStore({
  reducer: {
    module: statementBlockSlice.reducer,
  },
});
