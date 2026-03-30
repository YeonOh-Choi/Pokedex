"use client";

import { useState } from "react";
import PokemonDetail from "./components/detail/pokemon-detail";
import PokemonTable from "./components/pokemon-table";
import { fetchPokemonList } from "./service/pokemon-service";
import { DEFAULT_PAGE_SIZE } from "./constants/pagination";
import { QUERY_KEYS } from "./constants/query-keys";
import {
  PokemonListResponse,
  PokemonSearchResult,
} from "./types/pokemon-types";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { getNextPageParam } from "./utils/query-utils";

export default function Page() {
  const [selectedPokemonName, setSelectedPokemonName] = useState<string | null>(
    null,
  );

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

  const apiPokemon: PokemonSearchResult[] =
    data?.pages.flatMap((page) => page.results) ?? [];

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
        <h1 className="shrink-0 text-3xl font-bold text-black">Pokedex</h1>

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
            <PokemonTable
              data={apiPokemon}
              onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage) fetchNextPage();
              }}
              onEndReachedThreshold={0.3}
              onPress={(pokemon) => setSelectedPokemonName(pokemon.name)}
              ListFooterComponent={
                isFetchingNextPage ? (
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
