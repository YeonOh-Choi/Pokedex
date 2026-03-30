import { DEFAULT_PAGE_SIZE, OFFSET } from "../constants/pagination";
import { fetcher, pokeApiUrl } from "../lib/api/fetcher";
import { PokemonListResponse, Pokemon } from "../types/pokemon-types";
import { PokemonSpecies, EvolutionChainResponse } from "../types/pokemon-types";


// use URLSearchParams to put limit and offset
export async function fetchPokemonList(
  offset: number = OFFSET,
  limit: number = DEFAULT_PAGE_SIZE,
): Promise<PokemonListResponse> {
  const searchParams = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
  });
  const url = `${pokeApiUrl()}?${searchParams.toString()}`;
  return fetcher<PokemonListResponse>(url);
}

export async function fetchPokemonSpecies(name: string): Promise<PokemonSpecies> {
  const pokemonBase = pokeApiUrl();
  const speciesBase = pokemonBase.replace(/pokemon\/?$/, "pokemon-species/");
  const url = `${speciesBase}${encodeURIComponent(name)}`;
  return fetcher<PokemonSpecies>(url);
}

export async function fetchEvolutionChain(
  chainUrl: string,
): Promise<EvolutionChainResponse> {
  return fetcher<EvolutionChainResponse>(chainUrl);
}

//encodedurlcomponent: encode the name of the pokemon to avoid special characters
export async function fetchPokemonDetail(name: string): Promise<Pokemon> {
  const url = `${pokeApiUrl()}${encodeURIComponent(name)}`;
  return fetcher<Pokemon>(url);
}

//d =digits
export function getPokemonIdFromUrl(url: string): number {
  const match = url.match(/\/pokemon\/(\d+)\//);
  if (!match) {
    throw new Error("Invalid pokemon URL");
  }
  return Number(match[1]);
}
