import { Reducer } from 'redux';

import {
  SET_REVIEWER_ACTION,
  SetReviewerAction,
}
from '../actions/reviewer';
import { GitHubContributor } from '../../gitHub';
import initialState from '../initialState';

const reviewer: Reducer<GitHubContributor | null, SetReviewerAction> = (
  state = initialState.reviewer,
  { type, payload }
) => {
  switch (type) {
    case SET_REVIEWER_ACTION:
      return payload;
    default:
      return state;
  }
};

export default reviewer;
