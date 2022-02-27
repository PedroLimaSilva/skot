import { combineReducers } from 'redux';

import { fileReducer as file } from './file';

export const combinedReducers = combineReducers({ file });
