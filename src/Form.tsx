import React, { FC, useState, useEffect } from 'react';

import User from './User';
import Contributors from './Contributors';
import {
  GitHubUser,
  getUser,
  GitHubContributor,
  getRepositoryContributors,
} from './gitHub';
import useLocalStorage from './useLocalStorage';

const LOGIN_STORAGE_KEY = 'login';
const REPO_STORAGE_KEY = 'repo';
const BLACKLIST_STORAGE_KEY = 'blacklist';

const Form: FC = () => {
  const [login, setLogin] = useLocalStorage(LOGIN_STORAGE_KEY, '') as [string, React.Dispatch<React.SetStateAction<string>>];
  const [repo, setRepo] = useLocalStorage(REPO_STORAGE_KEY, '') as [string, React.Dispatch<React.SetStateAction<string>>];
  const [blacklist, setBlacklist] = useLocalStorage(BLACKLIST_STORAGE_KEY, '') as [string, React.Dispatch<React.SetStateAction<string>>];

  const [disabled, setDisabled] = useState<boolean>(!login || !repo);

  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repositoryContributors, setRepositoryContributors] = useState<GitHubContributor[]>([]);
  const [reviewer, setReviewer] = useState<GitHubContributor | null>(null);

  useEffect(() => {
    setDisabled(!login || !repo);
  }, [login, repo]);

  useEffect(() => {
    if (!user || repositoryContributors.length < 2) {
      return;
    }

    setReviewer(getRandomReviewer(user, repositoryContributors));
  }, [user, repositoryContributors]);

  function getRandomReviewer(user: GitHubUser, contributors: GitHubContributor[]): GitHubContributor | null {
    const reviewers = contributors.filter((contributor) => contributor.id !== user.id);

    if (!reviewers) {
      return null;
    }

    return reviewers[Math.floor(Math.random() * reviewers.length)];
  }

  return (
    <div>
      <form>
        <label>
          Login
          <br />
          <input
            type="text"
            name="login"
            value={login}
            onInput={e => setLogin((e.target as HTMLInputElement).value)}
          />
        </label>
        <br />
        <label>
          Repository
          <br />
          <input
            type="text"
            name="repo"
            value={repo}
            onInput={e => setRepo((e.target as HTMLInputElement).value)}
          />
        </label>
        <br />
        <label>
          Reviewer Blacklist
          <br />
          <input
            type="text"
            name="blacklist"
          />
        </label>
        <br />
        <input
          type="button"
          value="Search Reviewer"
          disabled={disabled}
          onClick={
            () => {
              getUser(login)
                .then((data) => setUser(data))
                .catch((error) => console.error(error));

              getRepositoryContributors(login, repo)
                .then((data) => setRepositoryContributors(data || []))
                .catch((error) => console.error(error));
            }
          }
        />
      </form>
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

export default Form;
