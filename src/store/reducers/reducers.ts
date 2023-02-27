import { combineReducers } from 'redux';

import settings from './settings';
import settingsVisible from './settingsVisible';
import gitHubUser from './gitHubUser';
import repositoryContributors from './repositoryContributors';
import reviewer from './reviewer';

const reducers = combineReducers({
  settings,
  settingsVisible,
  gitHubUser,
  repositoryContributors,
  reviewer,
});

export default reducers;
