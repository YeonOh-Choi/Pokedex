import {
  DrawerClose,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import type { Pokemon } from "../../types/pokemon-types";

type PokemonDetailHeaderProps = {
  pokemonName: string;
  pokemon?: Pokemon;
  mainSpriteUrl?: string;
  isMainImageLoading?: boolean;
  gradientFrom: string;
  gradientTo: string;
};

export default function PokemonDetailHeader({
  pokemonName,
  pokemon,
  mainSpriteUrl,
  isMainImageLoading,
  gradientFrom,
  gradientTo,
}: PokemonDetailHeaderProps) {
  const displayName = pokemon?.name ?? pokemonName;

  return (
    <section className="relative overflow-hidden bg-background pb-5">
      <div
        className="pointer-events-none absolute left-1/2 z-0 h-[528px] w-[748px] max-w-none -translate-x-1/2 -translate-y-3/15 rounded-[50%]"
        style={{
          top: -127,
          backgroundImage: `linear-gradient(180deg, ${gradientFrom}, ${gradientTo})`,
        }}
        aria-hidden
      />

      {/* watermark */}
      <img
        src="/union.svg"
        alt=""
        width={228}
        height={232}
        className="pointer-events-none absolute -right-24 -top-20 z-[1] w-[360px] max-w-none select-none opacity-40"
        aria-hidden
      />

      <div className="relative z-10 px-5 pt-5 text-white">
        <DrawerHeader className="space-y-3 p-0 text-left">
          <DrawerClose asChild>
            <button
              type="button"
              className="w-fit rounded-md px-1 py-0.5 text-sm font-medium text-white/90 underline-offset-4 hover:underline"
            >
              back
            </button>
          </DrawerClose>
          <DrawerTitle className="text-3xl font-extrabold capitalize leading-tight text-white">
            {displayName}
          </DrawerTitle>
          <DrawerDescription className="sr-only">
            Pokémon details for {pokemonName}
          </DrawerDescription>
        </DrawerHeader>
      </div>

      <div className="relative z-10 flex justify-center px-5 pt-1">
        {isMainImageLoading ? (
          <div
            className="flex h-56 w-56 max-w-full shrink-0 flex-col items-center justify-center rounded-2xl bg-white/25 animate-pulse"
            aria-busy="true"
            aria-live="polite"
          >
            <span className="text-sm font-medium text-white/85">
              Loading...
            </span>
          </div>
        ) : mainSpriteUrl ? (
          <img
            src={mainSpriteUrl}
            alt={displayName}
            className="h-56 w-56 max-w-full object-contain"
          />
        ) : (
          <p className="text-center text-sm text-white/90">
            No image to display.
          </p>
        )}
      </div>
    </section>
  );
}
