import { Dispatch } from 'redux';

import { RootState } from './store/store';
import { setRepositoryContributors } from './store/actionCreators/repositoryContributors';
import { getRepositoryContributors } from './gitHub';
import { SetRepositoryContributorsAction } from './store/actions/repositoryContributors';

export type Return = Promise<void | SetRepositoryContributorsAction>;
export type InnerFetchRepositoryContributors = (
  dispatch: Dispatch,
  getState: () => RootState
) => Return;

export type FetchRepositoryContributors = (login: string, repo: string) => InnerFetchRepositoryContributors;

function fetchRepositoryContributors(login: string, repo: string): InnerFetchRepositoryContributors {
  function innerFetchRepositoryContributors(dispatch: Dispatch, getState: () => RootState): Return {
    return getRepositoryContributors(login, repo)
      .then((data) => setRepositoryContributors(data ?? []))
      .catch((error) => console.error(error));
  }
  return innerFetchRepositoryContributors;
};

export default fetchRepositoryContributors;
