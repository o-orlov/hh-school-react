import {
  UPDATE_LOGIN_SETTING_ACTION,
  UPDATE_REPO_SETTING_ACTION,
  UPDATE_BLACKLIST_SETTING_ACTION,
  UpdateLoginSettingAction,
  UpdateRepoSettingAction,
  UpdateBlacklistSettingAction,
}
from '../actions/settings';

export function updateLoginSetting(login: string): UpdateLoginSettingAction {
  return {
    type: UPDATE_LOGIN_SETTING_ACTION,
    payload: login
  };
}

export function updateRepoSetting(repo: string): UpdateRepoSettingAction {
  return {
    type: UPDATE_REPO_SETTING_ACTION,
    payload: repo
  };
}

export function updateBlacklistSetting(blacklist: string): UpdateBlacklistSettingAction {
  return {
    type: UPDATE_BLACKLIST_SETTING_ACTION,
    payload: blacklist
  };
}
