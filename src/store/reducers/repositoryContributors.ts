import { Reducer } from 'redux';

import {
  SET_REPOSITORY_CONTRIBUTORS_ACTION,
  SetRepositoryContributorsAction,
}
from '../actions/repositoryContributors';
import { GitHubContributor } from '../../gitHub';
import initialState from '../initialState';

const repositoryContributors: Reducer<GitHubContributor[], SetRepositoryContributorsAction> = (
  state = initialState.repositoryContributors,
  { type, payload }
) => {
  switch (type) {
    case SET_REPOSITORY_CONTRIBUTORS_ACTION:
      return payload;
    default:
      return state;
  }
};

export default repositoryContributors;
