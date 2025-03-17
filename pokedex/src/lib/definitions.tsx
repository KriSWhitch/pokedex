export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: string;
  is_default: boolean;
  order: number;
  weight: number;
  types: PokemonType[];
  sprites: PokemonSprites
};

export type PokemonSprites = {
  front_default: string;
  front_shiny: string;
  front_female: string;
  front_shiny_female: string;
  back_default: string;
  back_shiny: string;
  back_female: string;
  back_shiny_female: string;
};

export type PokemonType = {
  slot: number;
  type: Type;
};

export type Type = {
  id: number;
  name: string;
};

export type PokemonReference = {
  name: string;
  url: string;
};

export type PokemonSpicies = {
  base_happiness: number,
  capture_rate: number,
  evolution_chain: string,
  flavor_text_entries: FlavorTextEntry[],
}

export type FlavorTextEntry = {
  flavor_text: string,
  language: Language,
  version: Version
}

export type Language = {
  name: string,
  url: string
}

export type Version = {
  name: string,
  url: string
}