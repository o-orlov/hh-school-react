import { FC } from 'react';

const Form: FC = () => {
  return (
    <form>
      <label>
        Login
        <br />
        <input type="text" name="login" />
      </label>
      <br />
      <label>
        Repository
        <br />
        <input type="text" name="repo" />
        </label>
      <br />
      <label>
        Blacklist
        <br />
        <input type="text" name="blacklist" />
        </label>
      <br />
      <input type="button" value="Search" />
    </form>
  );
}

export default Form;
