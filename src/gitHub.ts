async function get(url: string): Promise<unknown | null> {
  let response;
  try {
    response = await fetch(url);
  } catch (e) {
    console.error(`Error while fetching data from ${url}: ${(e as Error).message}`);
    return null;
  }

  if (!response.ok) {
    console.error(`HTTP-Error while fetching data from ${url}: ${response.status}`);
    return null;
  }

  let data;
  try {
    data = await response.json();
  } catch (e) {
    console.error(`Error while parsing response from ${url}: ${(e as Error).message}`);
    return null;
  }

  return data;
}

export interface GitHubContributor {
  login: string;
  id: number;
  avatar_url: string;
};

export async function getRepositoryContributors(login: string, repo: string): Promise<GitHubContributor[] | null> {
  // https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repository-contributors
  if (!login || !repo) {
    return null;
  }

  return get(`https://api.github.com/repos/${login}/${repo}/contributors`) as Promise<GitHubContributor[] | null>;
};

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
};

export async function getUser(login: string): Promise<GitHubUser | null> {
  // https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user
  if (!login) {
    return null;
  }

  return get(`https://api.github.com/users/${login}`) as Promise<GitHubUser | null>;
};
