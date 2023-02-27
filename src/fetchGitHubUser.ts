import { Dispatch } from 'redux';

import { RootState } from './store/store';
import { setGitHubUser } from './store/actionCreators/gitHubUser';
import { getUser } from './gitHub';
import { SetGitHubUserAction } from './store/actions/gitHubUser';

export type InnerFetchGitHubUser = (
  dispatch: Dispatch,
  getState: () => RootState
) => Promise<void | SetGitHubUserAction>;

export type FetchGitHubUser = (login: string) => InnerFetchGitHubUser;

function fetchGitHubUser(login: string): InnerFetchGitHubUser {
  function innerFetchGitHubUser(dispatch: Dispatch, getState: () => RootState): Promise<void | SetGitHubUserAction> {
    return getUser(login)
      .then((data) => dispatch(setGitHubUser(data)))
      .catch((error) => console.error(error));
  };
  return innerFetchGitHubUser;
};

export default fetchGitHubUser;
