import { combineReducers } from 'redux';

import settings from './settings';
import settingsVisible from './settingsVisible';
import gitHubUser from './gitHubUser';
import repositoryContributors from './repositoryContributors';

const reducers = combineReducers({
  settings,
  settingsVisible,
  gitHubUser,
  repositoryContributors,
});

export default reducers;
