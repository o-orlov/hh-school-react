import { FC } from 'react';
import { useDispatch } from 'react-redux';

import useLocalStorage, { StorageKey } from './useLocalStorage';
import {
  updateLoginSetting,
  updateRepoSetting,
  updateBlacklistSetting,
} from './store/actionCreators/settings';

type StringState = [string, React.Dispatch<React.SetStateAction<string>>];

const Form: FC = () => {
  const [login, setLogin] = useLocalStorage(StorageKey.LOGIN, '') as StringState;
  const [repo, setRepo] = useLocalStorage(StorageKey.REPO, '') as StringState;
  const [blacklist, setBlacklist] = useLocalStorage(StorageKey.BLACKLIST, '') as StringState;

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
            setLogin(value);
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
            setRepo(value);
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
            setBlacklist(value);
            dispatch(updateBlacklistSetting(value));
          }}
        />
      </label>
    </form>
  );
}

export default Form;
