import type { Pokemon } from "../../types/pokemon-types";

type PokemonDetailFooterProps = {
  pokemon: Pokemon;
  primaryToColor: string;
  /** [이전, 현재, 다음] 진화체 — official-artwork URL */
  spriteUrls?: [
    string | undefined,
    string | undefined,
    string | undefined,
  ];
  /** 해당 슬롯에 포켓몬 이름이 있고 API 로딩 중일 때만 true — null 슬롯은 사용 안 함 */
  spriteSlotLoading?: [boolean, boolean, boolean];
};

export default function PokemonDetailFooter({
  pokemon,
  primaryToColor,
  spriteUrls,
  spriteSlotLoading,
}: PokemonDetailFooterProps) {
  const slots = spriteUrls ?? [undefined, undefined, undefined];
  const loading = spriteSlotLoading ?? [false, false, false];

  return (
    <section className="bg-background px-5 pb-5">
      <div className="mt-6">
        <h3
          className="mb-3 text-center text-xl font-extrabold"
          style={{ color: primaryToColor }}
        >
          Sprites
        </h3>
        <div className="flex flex-row flex-nowrap items-center justify-center gap-8">
          {slots.map((url, index) => {
            if (loading[index]) {
              return (
                <div
                  key={index}
                  className="flex h-25 w-25 shrink-0 flex-col items-center justify-center rounded-xl bg-muted animate-pulse"
                  aria-busy="true"
                  aria-live="polite"
                >
                  <span className="px-1 text-center text-[10px] font-medium leading-tight text-muted-foreground">
                    Loading...
                  </span>
                </div>
              );
            }
            if (url) {
              return (
                <img
                  key={index}
                  src={url}
                  alt={`${pokemon.name} evolution ${index + 1}`}
                  className="h-25 w-25 shrink-0 object-contain"
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </section>
  );
}

