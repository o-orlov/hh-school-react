import {
  SET_REPOSITORY_CONTRIBUTORS_ACTION,
  SetRepositoryContributorsAction,
}
from '../actions/repositoryContributors';
import { GitHubContributor } from '../../gitHub';

export function setRepositoryContributors(repositoryContributors: GitHubContributor[]): SetRepositoryContributorsAction {
  return {
    type: SET_REPOSITORY_CONTRIBUTORS_ACTION,
    payload: repositoryContributors
  };
}
