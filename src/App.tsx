import { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from './store/store';
import SettingsForm from './SettingsForm';
import User from './User';
import Contributors from './Contributors';
import {
  GitHubContributor,
  getRepositoryContributors,
} from './gitHub';
import getRandomReviewer from './getRandomReviewer';
import fetchGitHubUser, { InnerFetchGitHubUser } from './fetchGitHubUser';

const App: FC = () => {
  const { login, repo, blacklist } = useSelector((state: RootState) => state.settings);

  const [settingsVisible, setSettingsVisible] = useState(false);

  const user = useSelector((state: RootState) => state.gitHubUser);
  const [repositoryContributors, setRepositoryContributors] = useState<GitHubContributor[]>([]);
  const [reviewer, setReviewer] = useState<GitHubContributor | null>(null);

  const dispatch = useDispatch() as (fn: InnerFetchGitHubUser) => void;

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

    getRepositoryContributors(login, repo)
      .then((data) => setRepositoryContributors(data ?? []))
      .catch((error) => console.error(error));
  }, [login, repo]);

  return (
    <div>
      <button onClick={() => setSettingsVisible(!settingsVisible)}>Settings</button>
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
