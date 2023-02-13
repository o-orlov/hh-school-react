import { FC, useState, useEffect } from 'react';

import { GitHubContributor, getRepositoryContributors } from './gitHub';
import Contributors from './Contributors';

const Form: FC = () => {
  const [login, setLogin] = useState<string>('');
  const [repo, setRepo] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
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
              getRepositoryContributors(login, repo)
                .then((data) => setRepositoryContributors(data || []))
                .catch((error) => console.error(error));
            }
          }
        />
      </form>
      {repositoryContributors?.length > 0 && <Contributors contributors={repositoryContributors} />}
    </div>
  );
}

export default Form;
