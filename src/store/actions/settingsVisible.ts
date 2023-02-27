import { Action } from 'redux';

export const SET_SETTINGS_VISIBLE_ACTION = 'SET_SETTINGS_VISIBLE_ACTION';

export interface SetSettingsVisibleAction extends Action<typeof SET_SETTINGS_VISIBLE_ACTION> {
  payload: boolean;
}
