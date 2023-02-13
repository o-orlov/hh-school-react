import { FC } from 'react';

import { GitHubUser } from './gitHub';

const User: FC<{ user: GitHubUser }> = (props) => {
  return (
    <div>
      <h3>Current User</h3>
      <div className="user">
        <img className="avatar" src={props.user.avatar_url} alt=""></img>
        <span className="login">{props.user.login}</span>
      </div>
    </div>
  );
}

export default User;
