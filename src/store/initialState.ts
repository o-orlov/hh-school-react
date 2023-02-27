import { getItemFromStorage, StorageKey } from '../useLocalStorage';

const initialState = {
  settings: {
    login: getItemFromStorage(StorageKey.LOGIN) as string ?? '',
    repo: getItemFromStorage(StorageKey.REPO) as string ?? '',
    blacklist: getItemFromStorage(StorageKey.BLACKLIST) as string ?? '',
  },
  settingsVisible: false,
  gitHubUser: null,
  repositoryContributors: [],
  reviewer: null,
};

export default initialState;
