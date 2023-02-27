import {
  SET_SETTINGS_VISIBLE_ACTION,
  SetSettingsVisibleAction,
}
from '../actions/settingsVisible';

export function setSettingsVisible(visible: boolean): SetSettingsVisibleAction {
  return {
    type: SET_SETTINGS_VISIBLE_ACTION,
    payload: visible
  };
}
