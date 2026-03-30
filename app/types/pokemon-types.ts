export type PokemonTypeName =
  | "normal"
  | "fighting"
  | "flying"
  | "poison"
  | "ground"
  | "rock"
  | "bug"
  | "ghost"
  | "steel"
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "psychic"
  | "ice"
  | "dragon"
  | "dark"
  | "fairy";

export interface Pokemon {
  id: number;
  name: string;
  types: Array<{
    slot: number;
    type: {
      name: PokemonTypeName;
      url: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  sprites: {
    front_default: string | null;
    other?: {
      "official-artwork"?: {
        front_default?: string | null;
        front_shiny?: string | null;
      };
    };
  };
}

export interface PokemonSearchResult {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonSearchResult[];
}

export interface PokemonSpecies {
  evolution_chain: {
    url: string;
  };
}

export interface EvolutionChainResponse {
  chain: import("../utils/evolution-chain").EvolutionChainLink;
}
