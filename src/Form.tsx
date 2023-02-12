import { FC, useState, useEffect } from 'react';

const Form: FC = () => {
  const [login, setLogin] = useState<string>('');
  const [repo, setRepo] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    setDisabled(!!(login && repo));
  }, [login, repo]);

  return (
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
        disabled={!disabled}
      />
    </form>
  );
}

export default Form;
