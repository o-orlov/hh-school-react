import { Action } from 'redux';

import { GitHubUser } from '../../gitHub';

export const SET_GITHUB_USER_ACTION = 'GET_GITHUB_USER_ACTION';

export interface SetGitHubUserAction extends Action<typeof SET_GITHUB_USER_ACTION> {
  payload: GitHubUser | null;
}
