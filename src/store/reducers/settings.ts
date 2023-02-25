import { Reducer } from 'redux';

import {
  UPDATE_LOGIN_SETTING_ACTION,
  UPDATE_REPO_SETTING_ACTION,
  UPDATE_BLACKLIST_SETTING_ACTION,
  UpdateLoginSettingAction,
  UpdateRepoSettingAction,
  UpdateBlacklistSettingAction,
}
from '../actions/settings';
import initialState from '../initialState';

export interface Settings {
  login: string;
  repo: string;
  blacklist: string;
}

const settings: Reducer<
  Settings,
  UpdateLoginSettingAction | UpdateRepoSettingAction | UpdateBlacklistSettingAction
> = (
  state = initialState.settings,
  { type, payload }
) => {
  switch (type) {
    case UPDATE_LOGIN_SETTING_ACTION:
      return { ...state, login: payload };
    case UPDATE_REPO_SETTING_ACTION:
      return { ...state, repo: payload };
    case UPDATE_BLACKLIST_SETTING_ACTION:
      return { ...state, blacklist: payload };
    default:
      return state;
  }
};

export default settings;
