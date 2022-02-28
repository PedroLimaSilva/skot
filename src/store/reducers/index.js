import Immutable from 'immutable';
import { combineReducers } from 'redux-immutable';

import { fileReducer as file } from './file';

const StateRecord = Immutable.Record({
  file: undefined,
});

export const combinedReducers = combineReducers({ file }, StateRecord);
