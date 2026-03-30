export const QUERY_KEYS = {
  pokemonList: {
    all: () => ["pokemon-list"] as const,
    searchIndex: () =>
      [...QUERY_KEYS.pokemonList.all(), "search-index"] as const,
    detail: (name: string) =>
      [...QUERY_KEYS.pokemonList.all(), "detail", name] as const,
  },
  pokemonSpecies: {
    byName: (name: string) => ["pokemon-species", name] as const,
  },
  evolutionChain: {
    byUrl: (name: string) => ["evolution-chain", name] as const,
  },
} as const;
