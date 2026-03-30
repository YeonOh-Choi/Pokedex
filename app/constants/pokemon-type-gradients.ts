import type { PokemonTypeName } from "../types/pokemon-types";

/** 피그마 타입별 그라데이션 (시작 → 끝) */
export const POKEMON_TYPE_GRADIENTS: Record<
  PokemonTypeName,
  { from: string; to: string }
> = {
  normal: { from: "#B0AF94", to: "#C9C8AD" },
  fire: { from: "#FFC09F", to: "#F06E35" },
  water: { from: "#8CA6FF", to: "#5374EB" },
  electric: { from: "#FFECB3", to: "#F2C02C" },
  grass: { from: "#9FD88F", to: "#6DB948" },
  ice: { from: "#B8F3F0", to: "#7FCACA" },
  fighting: { from: "#DF9B93", to: "#AD2C24" },
  poison: { from: "#D19ED2", to: "#933C93" },
  ground: { from: "#F1D9A7", to: "#D7A548" },
  flying: { from: "#E0CCFF", to: "#9461F5" },
  psychic: { from: "#FFB6CC", to: "#F34D7F" },
  bug: { from: "#C4D76D", to: "#85A915" },
  rock: { from: "#D3C97A", to: "#A58E31" },
  ghost: { from: "#BABDD1", to: "#5E5B77" },
  dragon: { from: "#C9A5FF", to: "#4E18B4" },
  dark: { from: "#B3ADA9", to: "#573F3A" },
  steel: { from: "#E1E1E5", to: "#8E8E9B" },
  fairy: { from: "#FAC3DC", to: "#9D567D" },
};

export function getTypeGradient(typeName: string): {
  from: string;
  to: string;
} {
  const key = typeName.toLowerCase() as PokemonTypeName;
  return POKEMON_TYPE_GRADIENTS[key] ?? POKEMON_TYPE_GRADIENTS.normal;
}
