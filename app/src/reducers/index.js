import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';

import userReducers from './user';

const config = {
  key: 'root',
  storage,
  whitelist: ['userReducers']
};

const reducers = persistCombineReducers(config, {
  userReducers,
});

export default reducers;
