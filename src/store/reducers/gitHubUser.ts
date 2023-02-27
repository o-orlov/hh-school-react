import { Reducer } from 'redux';

import {
  SET_GITHUB_USER_ACTION,
  SetGitHubUserAction,
}
from '../actions/gitHubUser';
import { GitHubUser } from '../../gitHub';
import initialState from '../initialState';

const gitHubUser: Reducer<GitHubUser | null, SetGitHubUserAction> = (
  state = initialState.gitHubUser,
  { type, payload }
) => {
  switch (type) {
    case SET_GITHUB_USER_ACTION:
      return payload;
    default:
      return state;
  }
};

export default gitHubUser;
