import { createStore } from '@reduxjs/toolkit';

import { combinedReducers as rootReducer } from './reducers';

export const Store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__({
      latency: 0,
    })
);
