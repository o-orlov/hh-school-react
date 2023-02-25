import { Action } from 'redux';

export const UPDATE_LOGIN_SETTING_ACTION = 'UPDATE_LOGIN_SETTING_ACTION';
export const UPDATE_REPO_SETTING_ACTION = 'UPDATE_REPO_SETTING_ACTION';
export const UPDATE_BLACKLIST_SETTING_ACTION = 'UPDATE_BLACKLIST_SETTING_ACTION';

export interface UpdateLoginSettingAction extends Action<typeof UPDATE_LOGIN_SETTING_ACTION> {
  payload: string;
}

export interface UpdateRepoSettingAction extends Action<typeof UPDATE_REPO_SETTING_ACTION> {
  payload: string;
}

export interface UpdateBlacklistSettingAction extends Action<typeof UPDATE_BLACKLIST_SETTING_ACTION> {
  payload: string;
}
