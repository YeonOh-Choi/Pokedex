"use client";

import { useQueries, useQuery } from "@tanstack/react-query";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { getTypeGradient } from "../../constants/pokemon-type-gradients";
import { QUERY_KEYS } from "../../constants/query-keys";
import {
  fetchEvolutionChain,
  fetchPokemonDetail,
  fetchPokemonSpecies,
} from "../../service/pokemon-service";
import type { Pokemon } from "../../types/pokemon-types";
import {
  collectLinearSpeciesNames,
  footerEvolutionTriplet,
} from "../../utils/evolution-chain";
import { officialArtworkUrl } from "../../utils/pokemon-sprites";
import PokemonDetailBody from "./pokemon-detail-body";
import PokemonDetailFooter from "./pokemon-detail-footer";
import PokemonDetailHeader from "./pokemon-detail-header";

type PokemonDetailProps = {
  pokemonName: string | null;
  onClose: () => void;
};

export default function PokemonDetail({
  pokemonName,
  onClose,
}: PokemonDetailProps) {
  const {
    data: pokemon,
    isLoading: isPokemonLoading,
    isError,
    error,
  } = useQuery<Pokemon, Error>({
    queryKey: QUERY_KEYS.pokemonList.detail(pokemonName!),
    queryFn: () => fetchPokemonDetail(pokemonName!),
    enabled: Boolean(pokemonName),
  });

  const { data: species } = useQuery({
    queryKey: QUERY_KEYS.pokemonSpecies.byName(pokemonName!),
    queryFn: () => fetchPokemonSpecies(pokemonName!),
    enabled: Boolean(pokemonName),
  });

  const chainUrl = species?.evolution_chain?.url;

  const { data: evolutionData } = useQuery({
    queryKey: QUERY_KEYS.evolutionChain.byUrl(chainUrl ?? ""),
    queryFn: () => fetchEvolutionChain(chainUrl!),
    enabled: Boolean(pokemonName && chainUrl),
  });

  const tripletNames =
    pokemon && evolutionData?.chain
      ? footerEvolutionTriplet(
          collectLinearSpeciesNames(evolutionData.chain),
          pokemon.name,
        )
      : pokemon
        ? footerEvolutionTriplet([pokemon.name], pokemon.name)
        : undefined;

  const [nameA, nameB, nameC] = tripletNames ?? [null, null, null];

  const evolutionSlotQueries = useQueries({
    queries: [
      {
        queryKey: QUERY_KEYS.pokemonList.detail(nameA ?? "__empty-0"),
        queryFn: () => fetchPokemonDetail(nameA!),
        enabled: Boolean(pokemon && nameA),
      },
      {
        queryKey: QUERY_KEYS.pokemonList.detail(nameB ?? "__empty-1"),
        queryFn: () => fetchPokemonDetail(nameB!),
        enabled: Boolean(pokemon && nameB),
      },
      {
        queryKey: QUERY_KEYS.pokemonList.detail(nameC ?? "__empty-2"),
        queryFn: () => fetchPokemonDetail(nameC!),
        enabled: Boolean(pokemon && nameC),
      },
    ],
  });

  const footerSpriteUrls: [
    string | undefined,
    string | undefined,
    string | undefined,
  ] = [
    nameA && evolutionSlotQueries[0].data
      ? officialArtworkUrl(evolutionSlotQueries[0].data) ?? undefined
      : undefined,
    nameB && evolutionSlotQueries[1].data
      ? officialArtworkUrl(evolutionSlotQueries[1].data) ?? undefined
      : undefined,
    nameC && evolutionSlotQueries[2].data
      ? officialArtworkUrl(evolutionSlotQueries[2].data) ?? undefined
      : undefined,
  ];

  const spriteSlotLoading: [boolean, boolean, boolean] = [
    Boolean(nameA) && evolutionSlotQueries[0].isPending,
    Boolean(nameB) && evolutionSlotQueries[1].isPending,
    Boolean(nameC) && evolutionSlotQueries[2].isPending,
  ];

  const mainSpriteUrl = pokemon ? officialArtworkUrl(pokemon) : undefined;

  const primaryTypeName = pokemon?.types?.[0]?.type?.name ?? "normal";
  const primaryGradient = getTypeGradient(primaryTypeName);
  const primaryToColor = primaryGradient.to;
  const primaryFromColor = primaryGradient.from;

  return (
    <Drawer
      open={pokemonName !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      direction="right"
      shouldScaleBackground={false}
    >
      <DrawerContent
        aria-describedby={undefined}
        className="flex h-full max-h-screen flex-col gap-0 border-l p-0 sm:max-w-sm"
      >
        {pokemonName ? (
          <>
            <DrawerTitle className="sr-only">
              {pokemon?.name ?? pokemonName}
            </DrawerTitle>
            <DrawerDescription className="sr-only">
              Pokémon details for {pokemon?.name ?? pokemonName}
            </DrawerDescription>

            <div className="min-h-0 flex-1 overflow-y-auto">
              {isError && (
                <p className="px-5 pt-4 text-sm text-destructive">
                  {error?.message ?? "Failed to load pokemon"}
                </p>
              )}

              {pokemonName && (pokemon || (isPokemonLoading && !isError)) && (
                <PokemonDetailHeader
                  pokemonName={pokemonName}
                  pokemon={pokemon}
                  mainSpriteUrl={mainSpriteUrl}
                  isMainImageLoading={isPokemonLoading && !pokemon}
                  gradientFrom={primaryFromColor}
                  gradientTo={primaryToColor}
                />
              )}

              {pokemon && (
                <>
                  <PokemonDetailBody
                    pokemon={pokemon}
                    primaryToColor={primaryToColor}
                  />
                  <PokemonDetailFooter
                    pokemon={pokemon}
                    primaryToColor={primaryToColor}
                    spriteUrls={footerSpriteUrls}
                    spriteSlotLoading={spriteSlotLoading}
                  />
                </>
              )}
            </div>
          </>
        ) : null}
      </DrawerContent>
    </Drawer>
  );
}
