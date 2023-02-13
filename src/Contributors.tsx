import { FC } from 'react';

import { GitHubContributor } from './gitHub';

const Contributor: FC<{ contributor: GitHubContributor }> = (props) => {
  return (
    <li className="contributor">
      <img className="avatar" src={props.contributor.avatar_url} alt=""></img>
      <span className="login">{props.contributor.login}</span>
    </li>
  );
}

const Contributors: FC<{ contributors: GitHubContributor[] }> = (props) => {
  return (
    <div>
      <h3>Contributors</h3>
      <ul className="contributor-list">
        {props.contributors.map((contributor: GitHubContributor) => (
          <Contributor key={contributor.id} contributor={contributor} />
        ))}
      </ul>
    </div>
  );
}

export default Contributors;
