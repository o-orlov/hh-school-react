import { FC, useState, useEffect } from 'react';

import User from './User';
import Contributors from './Contributors';
import {
  GitHubUser,
  getUser,
  GitHubContributor,
  getRepositoryContributors,
} from './gitHub';

const Form: FC = () => {
  const [login, setLogin] = useState<string>('');
  const [repo, setRepo] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repositoryContributors, setRepositoryContributors] = useState<GitHubContributor[]>([]);

  useEffect(() => {
    setDisabled(!login || !repo);
  }, [login, repo]);

  return (
    <div>
      <form>
        <label>
          Login
          <br />
          <input
            type="text"
            name="login"
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
      {user && <User user={user} />}
      {repositoryContributors?.length > 0 && <Contributors contributors={repositoryContributors} />}
    </div>
  );
}

export default Form;
