import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from './store/store';
import SettingsForm from './SettingsForm';
import User from './User';
import Contributors from './Contributors';
import getRandomReviewer from './getRandomReviewer';
import fetchGitHubUser, { InnerFetchGitHubUser } from './fetchGitHubUser';
import fetchRepositoryContributors, { InnerFetchRepositoryContributors } from './fetchRepositoryContributors';
import { setSettingsVisible } from './store/actionCreators/settingsVisible';
import { setReviewer } from './store/actionCreators/reviewer';

const App: FC = () => {
  const { login, repo, blacklist } = useSelector((state: RootState) => state.settings);
  const settingsVisible = useSelector((state: RootState) => state.settingsVisible);
  const user = useSelector((state: RootState) => state.gitHubUser);
  const repositoryContributors = useSelector((state: RootState) => state.repositoryContributors);
  const reviewer = useSelector((state: RootState) => state.reviewer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!login) {
      return;
    }

    (dispatch as (fn: InnerFetchGitHubUser) => Promise<void>)(fetchGitHubUser(login));
  }, [login, dispatch]);

  useEffect(() => {
    if (!login || !repo) {
      return;
    }

    (dispatch as (fn: InnerFetchRepositoryContributors) => Promise<void>)(fetchRepositoryContributors(login, repo));
  }, [login, repo, dispatch]);

  return (
    <div>
      <button onClick={() => dispatch(setSettingsVisible(!settingsVisible))}>Settings</button>
      {settingsVisible && (
        <SettingsForm />
      )}
      <br />
      <button
        onClick={
          () => {
            let reviewer = null;
            if (user && repositoryContributors.length > 1) {
              reviewer = getRandomReviewer(user, repositoryContributors, blacklist);
            }
            dispatch(setReviewer(reviewer));
          }
        }
      >
        Search
      </button>
      {user && (
        <div>
          <h3>Current User</h3>
          <User user={user} />
        </div>
      )}
      {repositoryContributors.length > 0 && <Contributors contributors={repositoryContributors} />}
      {reviewer && (
        <div>
          <h3>Random Reviewer</h3>
          <User user={reviewer} />
        </div>
      )}
    </div>
  );
}

export default App;
