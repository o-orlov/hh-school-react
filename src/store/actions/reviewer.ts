import { Action } from 'redux';

import { GitHubContributor } from '../../gitHub';

export const SET_REVIEWER_ACTION = 'SET_REVIEWER_ACTION';

export interface SetReviewerAction extends Action<typeof SET_REVIEWER_ACTION> {
  payload: GitHubContributor | null;
}
