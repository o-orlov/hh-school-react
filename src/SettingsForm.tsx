import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from './store/store';
import {
  updateLoginSetting,
  updateRepoSetting,
  updateBlacklistSetting,
} from './store/actionCreators/settings';

const Form: FC = () => {
  const { login, repo, blacklist } = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();

  return (
    <form>
      <label>
        Login
        <br />
        <input
          type="text"
          name="login"
          value={login}
          onChange={e => {
            const value = (e.target as HTMLInputElement).value;
            dispatch(updateLoginSetting(value));
          }}
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
          onChange={e => {
            const value = (e.target as HTMLInputElement).value;
            dispatch(updateRepoSetting(value));
          }}
        />
      </label>
      <br />
      <label>
        Blacklist
        <br />
        <textarea
          name="blacklist"
          value={blacklist}
          onChange={e => {
            const value = (e.target as HTMLTextAreaElement).value;
            dispatch(updateBlacklistSetting(value));
          }}
        />
      </label>
    </form>
  );
}

export default Form;
