import { combineReducers } from 'redux';

import settings from './settings';
import gitHubUser from './gitHubUser';
import repositoryContributors from './repositoryContributors';

const reducers = combineReducers({
  settings,
  gitHubUser,
  repositoryContributors,
});

export default reducers;
