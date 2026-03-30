import { getTypeGradient } from "../../constants/pokemon-type-gradients";
import type { Pokemon } from "../../types/pokemon-types";

type PokemonDetailBodyProps = {
  pokemon: Pokemon;
  primaryToColor: string;
};

export default function PokemonDetailBody({
  pokemon,
  primaryToColor,
}: PokemonDetailBodyProps) {
  return (
    <section className="bg-background px-5 pb-5">
      <div className="flex flex-wrap justify-center gap-2">
        {pokemon.types.map((pokemonType) => {
          const { to } = getTypeGradient(pokemonType.type.name);
          return (
            <span
              key={pokemonType.type.name}
              className="rounded-full px-4 py-1 text-sm font-bold capitalize text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.25)]"
              style={{ backgroundColor: to }}
            >
              {pokemonType.type.name}
            </span>
          );
        })}
      </div>

      <div
        className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3 text-base font-semibold"
        style={{ color: primaryToColor }}
      >
        {pokemon.stats.slice(0, 6).map((stat) => (
          <div
            key={stat.stat.name}
            className="flex items-baseline justify-between gap-3"
          >
            <span className="capitalize">
              {stat.stat.name.replace("-", " ")}
            </span>
            <span className="shrink-0 tabular-nums">{stat.base_stat}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
