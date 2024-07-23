import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

export const searchUsers = async (query: string) => {
  const response = await axios.get(`${GITHUB_API_URL}/search/users`, {
    params: { q: query, per_page: 5 },
  });
  return response.data.items;
};

export const getUserRepos = async (username: string) => {
  const response = await axios.get(`${GITHUB_API_URL}/users/${username}/repos`);
  return response.data;
};
