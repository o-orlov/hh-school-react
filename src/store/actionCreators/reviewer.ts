import {
  SET_REVIEWER_ACTION,
  SetReviewerAction,
}
from '../actions/reviewer';
import { GitHubContributor } from '../../gitHub';

export function setReviewer(reviewer: GitHubContributor | null): SetReviewerAction {
  return {
    type: SET_REVIEWER_ACTION,
    payload: reviewer
  };
}
