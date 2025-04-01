export const API_BASE_URL = process.env.API_URL;

export const API_ENDPOINTS = {
  POKEMON: '/pokemon',
  POKEMON_SPECIES: '/pokemon-species'
};

export const createUrl = (path: string) => API_BASE_URL + path;

export const fetchData = async (url: string) => {
  const response = await fetch(url);
  if (response.status === 200) {
    const data = await response.json();

    return data;
  } else {
    return null;
  }
}