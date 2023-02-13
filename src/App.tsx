import { FC, useState, useEffect } from 'react';

import useLocalStorage from './useLocalStorage';
import SettingsContext from "./SettingsContext";
import SettingsForm from './SettingsForm';
import User from './User';
import Contributors from './Contributors';
import {
  GitHubUser,
  getUser,
  GitHubContributor,
  getRepositoryContributors,
} from './gitHub';

const enum StorageKey {
  LOGIN = 'login',
  REPO = 'repo',
  BLACKLIST = 'blacklist',
};

type StringState = [string, React.Dispatch<React.SetStateAction<string>>];

const App: FC = () => {
  const [login, setLogin] = useLocalStorage(StorageKey.LOGIN, '') as StringState;
  const [repo, setRepo] = useLocalStorage(StorageKey.REPO, '') as StringState;
  const [blacklist, setBlacklist] = useLocalStorage(StorageKey.BLACKLIST, '') as StringState;

  const settings = { login, setLogin, repo, setRepo, blacklist, setBlacklist };

  const [settingsVisible, setSettingsVisible] = useState(false);

  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repositoryContributors, setRepositoryContributors] = useState<GitHubContributor[]>([]);
  const [reviewer, setReviewer] = useState<GitHubContributor | null>(null);

  useEffect(() => {
    if (!login || user?.login === login) {
      return;
    }

    getUser(login)
      .then((data) => setUser(data))
      .catch((error) => console.error(error));
  }, [login, user]);

  useEffect(() => {
    if (!login || !repo) {
      return;
    }

    getRepositoryContributors(login, repo)
      .then((data) => setRepositoryContributors(data ?? []))
      .catch((error) => console.error(error));
  }, [login, repo]);

  function getRandomReviewer(
      user: GitHubUser,
      contributors: GitHubContributor[],
      blacklist: string | undefined,
  ): GitHubContributor | null {
    const blacklist_values = blacklist?.split(',').map((value) => value.trim()) ?? [];
    const reviewers = contributors.filter((contributor) => (
      contributor.id !== user.id
      && blacklist_values.indexOf(contributor.login) < 0
    ));

    if (!reviewers) {
      return null;
    }

    return reviewers[Math.floor(Math.random() * reviewers.length)];
  }

  return (
    <div>
      <button onClick={() => setSettingsVisible(!settingsVisible)}>Settings</button>
      {settingsVisible && (
        <SettingsContext.Provider value={settings}>
          <SettingsForm />
        </SettingsContext.Provider>
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
