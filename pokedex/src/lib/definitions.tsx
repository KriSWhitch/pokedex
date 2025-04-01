export type PokemonData = {
  count: number,
  next: string,
  previous: string,
  results: PokemonReference[]
}

export type Pokemon = {
  id: number,
  name: string,
  base_experience: number,
  height: number,
  is_default: boolean,
  order: number,
  weight: number,
  types: PokemonType[],
  sprites: PokemonSprites,
  abilities: Ability[],
  stats: PokemonStat[]
};

export type PokemonStat = {
  base_stat: number,
  effort: number,
  stat: {
    name: string,
    url: string
  }
}

export type Stat = {
  id: number,
  name: string,
  game_index: number,
  is_battle_only: boolean
}

export type PokemonSprites = {
  front_default: string,
  front_shiny: string,
  front_female: string,
  front_shiny_female: string,
  back_default: string,
  back_shiny: string,
  back_female: string,
  back_shiny_female: string
};

export type Ability = {
  ability: {
    name: string,
    url: string
  },
  is_hidden: boolean,
  slot: number
}

export type PokemonType = {
  slot: number,
  type: Type
};

export type Type = {
  id: number,
  name: string,
  url: string,
  damage_relations: TypeRelations
};

export type TypeRelations = {
  no_damage_to: Type[],
  half_damage_to: Type[],
  double_damage_to: Type[],
  no_damage_from: Type[],
  half_damage_from: Type[],
  double_damage_from: Type[]
}

export type PokemonReference = {
  name: string,
  url: string
};

export type PokemonSpecies = {
  id: number,
  name: string,
  order: number,
  base_happiness: number,
  capture_rate: number,
  evolution_chain: EvolutionChainReference,
  flavor_text_entries: FlavorTextEntry[],
  genera: Genera[],
  url: string
}

export type EvolutionChainReference = {
  url: string
}

export type EvolutionChain = {
  id: number,
  baby_trigger_item: Item,
  chain: ChainLink
}

export type Item = {
  id: number,
  name: string,
  cost: number
}

export type ChainLink = {
  is_baby: boolean,
  species: PokemonSpecies,
  evolution_details: EvolutionDetail[],
  evolves_to: ChainLink[]
}

export type EvolutionDetail = {
  item: Item,
  gender: number
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

export type Genera = {
  genus: string,
  language: Language
}