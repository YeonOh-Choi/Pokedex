import type { Pokemon } from "../types/pokemon-types";

export function officialArtworkUrl(pokemon: Pokemon): string | undefined {
  const url =
    pokemon.sprites.other?.["official-artwork"]?.front_default ??
    pokemon.sprites.front_default;
  return url ?? undefined;
}
