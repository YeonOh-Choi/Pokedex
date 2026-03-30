import { DEFAULT_PAGE_SIZE } from "../constants/pagination";
import { PokemonListResponse } from "../types/pokemon-types";

export function getNextPageParam(
  lastPage: PokemonListResponse,
  allPages: PokemonListResponse[],
) {
  if (lastPage.results.length < DEFAULT_PAGE_SIZE || !lastPage.next) {
    return undefined;
  }
  return allPages.reduce((sum, page) => sum + page.results.length, 0);
}
