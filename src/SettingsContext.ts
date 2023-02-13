import React from 'react';

const SettingsContext = React.createContext({
  login: '',
  setLogin: (login: string) => {},
  repo: '',
  setRepo: (repo: string) => {},
  blacklist: '',
  setBlacklist: (blacklist: string) => {},
});

export default SettingsContext;