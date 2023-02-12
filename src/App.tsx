import { FC, useState } from 'react';

import Form from './Form';

const App: FC = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible(!visible)} type="button">Settings</button>
      {visible && <Form />}
    </div>
  );
}

export default App;
