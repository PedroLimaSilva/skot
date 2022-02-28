import { createStore } from '@reduxjs/toolkit';

import { combinedReducers as rootReducer } from './reducers';

export const Store = createStore(rootReducer);
