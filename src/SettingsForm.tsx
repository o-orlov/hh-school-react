import { FC, useContext } from 'react';

import SettingsContext from "./SettingsContext";

const Form: FC = () => {
  const {
    login,
    setLogin,
    repo,
    setRepo,
    blacklist,
    setBlacklist
  } = useContext(SettingsContext);

  return (
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
        Blacklist
        <br />
        <textarea
          name="blacklist"
          value={blacklist}
          onInput={e => setBlacklist((e.target as HTMLInputElement).value)}
        />
      </label>
    </form>
  );
}

export default Form;
