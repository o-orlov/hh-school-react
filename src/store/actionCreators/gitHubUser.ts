import {
  SET_GITHUB_USER_ACTION,
  SetGitHubUserAction,
}
from '../actions/gitHubUser';
import { GitHubUser } from '../../gitHub';

export function setGitHubUser(gitHubUser: GitHubUser | null): SetGitHubUserAction {
  return {
    type: SET_GITHUB_USER_ACTION,
    payload: gitHubUser
  };
}
