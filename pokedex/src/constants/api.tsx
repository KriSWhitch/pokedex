export const API_BASE_URL = process.env.API_URL;

export const API_ENDPOINTS = {
  POKEMON: '/pokemon',
  POKEMON_SPICIES: '/pokemon-species'
};

export const createUrl = (path: string) => API_BASE_URL + path;