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

export const enum StorageKey {
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
  const [searchDisabled, setSearchDisabled] = useState<boolean>(true);

  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repositoryContributors, setRepositoryContributors] = useState<GitHubContributor[]>([]);
  const [reviewer, setReviewer] = useState<GitHubContributor | null>(null);

  useEffect(() => {
    setSearchDisabled(!login || !repo);
  }, [login, repo]);

  useEffect(() => {
    if (!user || repositoryContributors.length < 2) {
      return;
    }

    setReviewer(getRandomReviewer(user, repositoryContributors, blacklist));
  }, [user, repositoryContributors, blacklist]);

  function getRandomReviewer(
      user: GitHubUser,
      contributors: GitHubContributor[],
      blacklist: string | undefined,
  ): GitHubContributor | null {
    const reviewers = contributors.filter((contributor) => contributor.id !== user.id);

    if (!reviewers) {
      return null;
    }

    return reviewers[Math.floor(Math.random() * reviewers.length)];
  }

  return (
    <div>
      <button onClick={() => setSettingsVisible(!settingsVisible)} type="button">Settings</button>
      {settingsVisible && (
        <SettingsContext.Provider value={settings}>
          <SettingsForm />
        </SettingsContext.Provider>
      )}
      <br />
      <button
        disabled={searchDisabled}
        onClick={
          () => {
            if (!settings) {
              return;
            }

            getUser(settings.login)
              .then((data) => setUser(data))
              .catch((error) => console.error(error));

            getRepositoryContributors(settings.login, settings.repo)
              .then((data) => setRepositoryContributors(data || []))
              .catch((error) => console.error(error));
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
