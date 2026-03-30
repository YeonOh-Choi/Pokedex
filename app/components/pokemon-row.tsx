import { PokemonSearchResult } from "../types/pokemon-types";
import { green } from "../constants/color";
import { getPokemonIdFromUrl } from "../service/pokemon-service";

type Props = {
  pokemon: PokemonSearchResult;
  onPress?: (pokemon: PokemonSearchResult) => void;
};

export default function PokemonRow({ pokemon, onPress }: Props) {
  const id = getPokemonIdFromUrl(pokemon.url);
  const idLabel = `#${String(id).padStart(3, "0")}`;

  return (
    <button
      type="button"
      onClick={() => onPress?.(pokemon)}
      className="box-border mx-auto flex h-[71px] w-full max-w-[258px] min-w-0 items-center rounded-2xl px-6 font-bold leading-none text-white outline-none ring-0 transition-opacity hover:opacity-95 active:opacity-90"
      style={{ backgroundColor: green[100] }}
    >
      <span>{idLabel}</span>
      <span className="flex-1 truncate pl-3 text-right text-base capitalize">
        {pokemon.name}
      </span>
    </button>
  );
}
