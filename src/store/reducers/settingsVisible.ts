import { Reducer } from 'redux';

import {
  SET_SETTINGS_VISIBLE_ACTION,
  SetSettingsVisibleAction,
}
from '../actions/settingsVisible';
import initialState from '../initialState';

const settingsVisible: Reducer<boolean, SetSettingsVisibleAction> = (
  state = initialState.settingsVisible,
  { type, payload }
) => {
  switch (type) {
    case SET_SETTINGS_VISIBLE_ACTION:
      return payload;
    default:
      return state;
  }
};

export default settingsVisible;
