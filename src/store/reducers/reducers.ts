import { combineReducers } from 'redux';

import settings from './settings';
import gitHubUser from './gitHubUser';

const reducers = combineReducers({
  settings,
  gitHubUser,
});

export default reducers;
