import { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from './store/store';
import SettingsForm from './SettingsForm';
import User from './User';
import Contributors from './Contributors';
import { GitHubContributor } from './gitHub';
import getRandomReviewer from './getRandomReviewer';
import fetchGitHubUser, { InnerFetchGitHubUser } from './fetchGitHubUser';
import fetchRepositoryContributors, { InnerFetchRepositoryContributors } from './fetchRepositoryContributors';
import { setSettingsVisible } from './store/actionCreators/settingsVisible';
import { SetSettingsVisibleAction } from './store/actions/settingsVisible';

const App: FC = () => {
  const { login, repo, blacklist } = useSelector((state: RootState) => state.settings);
  const settingsVisible = useSelector((state: RootState) => state.settingsVisible);
  const user = useSelector((state: RootState) => state.gitHubUser);
  const repositoryContributors = useSelector((state: RootState) => state.repositoryContributors);

  const dispatch = useDispatch() as (fn: InnerFetchGitHubUser | InnerFetchRepositoryContributors | SetSettingsVisibleAction) => Promise<void>;

  const [reviewer, setReviewer] = useState<GitHubContributor | null>(null);

  useEffect(() => {
    if (!login) {
      return;
    }

    dispatch(fetchGitHubUser(login));
  }, [login, dispatch]);

  useEffect(() => {
    if (!login || !repo) {
      return;
    }

    dispatch(fetchRepositoryContributors(login, repo));
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
            if (!user || repositoryContributors.length < 1) {
              setReviewer(null);
            } else {
              setReviewer(getRandomReviewer(user, repositoryContributors, blacklist));
            }
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
