import { Action } from 'redux';

import { GitHubContributor } from '../../gitHub';

export const SET_REPOSITORY_CONTRIBUTORS_ACTION = 'SET_REPOSITORY_CONTRIBUTORS_ACTION';

export interface SetRepositoryContributorsAction extends Action<typeof SET_REPOSITORY_CONTRIBUTORS_ACTION> {
  payload: GitHubContributor[];
}
