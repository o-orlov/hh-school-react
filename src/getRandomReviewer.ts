import { GitHubUser, GitHubContributor } from './gitHub';

function getRandomReviewer(
    user: GitHubUser,
    contributors: GitHubContributor[],
    blacklist: string | undefined,
  ): GitHubContributor | null {
  const blacklist_values = blacklist?.split(',').map((value) => value.trim()) ?? [];
  const reviewers = contributors.filter((contributor) => (
    contributor.id !== user.id
    && blacklist_values.indexOf(contributor.login) < 0
  ));

  if (!reviewers) {
    return null;
  }

  return reviewers[Math.floor(Math.random() * reviewers.length)];
}

export default getRandomReviewer;
