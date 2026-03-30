"use client";

import { useMemo, useState } from "react";
import PokemonDetail from "./components/detail/pokemon-detail";
import PokemonTable from "./components/pokemon-table";
import {
  fetchPokemonList,
  fetchPokemonSearchIndex,
} from "./service/pokemon-service";
import { DEFAULT_PAGE_SIZE } from "./constants/pagination";
import { QUERY_KEYS } from "./constants/query-keys";
import {
  PokemonListResponse,
  PokemonSearchResult,
} from "./types/pokemon-types";

import PokemonSearchBar from "./components/pokemon-search";
import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { getNextPageParam } from "./utils/query-utils";

function filterPokemonByQuery(
  list: PokemonSearchResult[],
  query: string,
): PokemonSearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter((p) => p.name.toLowerCase().includes(q));
}

export default function Page() {
  const [selectedPokemonName, setSelectedPokemonName] = useState<string | null>(
    null,
  );

  const [searchQuery, setSearchQuery] = useState("");

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    PokemonListResponse,
    Error,
    InfiniteData<PokemonListResponse>,
    ReturnType<typeof QUERY_KEYS.pokemonList.all>,
    number
  >({
    queryKey: QUERY_KEYS.pokemonList.all(),
    queryFn: ({ pageParam }) => fetchPokemonList(pageParam, DEFAULT_PAGE_SIZE),
    getNextPageParam: getNextPageParam,
    initialPageParam: 0,
  });

  const {
    data: searchIndexData,
    isLoading: isSearchIndexLoading,
    isError: isSearchIndexError,
  } = useQuery({
    queryKey: QUERY_KEYS.pokemonList.searchIndex(),
    queryFn: fetchPokemonSearchIndex,
  });

  const searchList = searchIndexData?.results ?? [];

  const isSearching = searchQuery.trim().length > 0;

  const apiPokemon: PokemonSearchResult[] =
    data?.pages.flatMap((page) => page.results) ?? [];

  const displayPokemon = useMemo(() => {
    if (!isSearching) return apiPokemon;
    return filterPokemonByQuery(searchList, searchQuery);
  }, [isSearching, apiPokemon, searchList, searchQuery]);

  return (
    <main className="relative flex min-h-0 flex-1 flex-col overflow-x-hidden bg-slate-100 p-8">
      <img
        src="/union.svg"
        alt=""
        width={228}
        height={232}
        className="pointer-events-none absolute -right-24 -top-20 z-0 w-[360px] max-w-none select-none opacity-40"
        aria-hidden
      />
      <div className="relative z-10 flex min-h-0 flex-1 flex-col gap-8">
        <div className="flex items-center gap-4">
          <h1 className="shrink-0 text-3xl font-bold text-black">Pokedex</h1>
          <div className="ml-auto w-full max-w-md">
            <PokemonSearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>

        {isLoading && (
          <p className="shrink-0 rounded border bg-white p-4">Loading...</p>
        )}

        {isError && (
          <p className="shrink-0 rounded border border-red-200 bg-red-50 p-4 text-red-600">
            Failed to fetch pokemon data
          </p>
        )}

        {!isLoading && !isError && (
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden text-black">
            {isSearching && isSearchIndexLoading ? (
              <p className="shrink-0 rounded border bg-white p-3 text-sm text-slate-700">
                Loading search index...
              </p>
            ) : null}
            {isSearching && isSearchIndexError ? (
              <p className="shrink-0 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                Failed to load search index
              </p>
            ) : null}
            <PokemonTable
              data={displayPokemon}
              onEndReached={() => {
                if (isSearching) return;
                if (hasNextPage && !isFetchingNextPage) fetchNextPage();
              }}
              onEndReachedThreshold={0.3}
              onPress={(pokemon) => setSelectedPokemonName(pokemon.name)}
              ListFooterComponent={
                !isSearching && isFetchingNextPage ? (
                  <p className="text-center text-xs text-slate-500">
                    Loading more...
                  </p>
                ) : null
              }
            />
          </div>
        )}
      </div>

      <PokemonDetail
        pokemonName={selectedPokemonName}
        onClose={() => setSelectedPokemonName(null)}
      />
    </main>
  );
}
