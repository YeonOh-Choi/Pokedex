import { useCallback, useRef, type ReactNode } from "react";
import PokemonRow from "./pokemon-row";
import { PokemonSearchResult } from "../types/pokemon-types";

type PokemonTableProps = {
  title?: string;
  /** FlatList `data`와 동일 */
  data: PokemonSearchResult[];
  onPress?: (pokemon: PokemonSearchResult) => void;
  /** 리스트 끝 근처에서 호출 (FlatList `onEndReached`) */
  onEndReached?: () => void;
  /** 0~1, 끝에서 이 비율만큼 가까워지면 로드 (FlatList `onEndReachedThreshold`) */
  onEndReachedThreshold?: number;
  ListFooterComponent?: ReactNode;
};

const DEFAULT_END_REACHED_THRESHOLD = 0.3;

export default function PokemonTable({
  title,
  data,
  onPress,
  onEndReached,
  onEndReachedThreshold = DEFAULT_END_REACHED_THRESHOLD,
  ListFooterComponent,
}: PokemonTableProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setSentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      observerRef.current?.disconnect();
      observerRef.current = null;

      if (!node || !onEndReached) return;

      const pct = Math.round(
        Math.min(1, Math.max(0, onEndReachedThreshold)) * 100,
      );

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry?.isIntersecting) {
            onEndReached();
          }
        },
        {
          root: null,
          rootMargin: `0px 0px ${pct}% 0px`,
          threshold: 0,
        },
      );

      observer.observe(node);
      observerRef.current = observer;
    },
    [onEndReached, onEndReachedThreshold, data.length],
  );

  return (
    <section className="flex h-full min-h-0 min-w-0 flex-col space-y-3">
      {title ? <h2 className="shrink-0 text-xl font-bold">{title}</h2> : null}

      <div className="min-h-0 w-full flex-1 overflow-y-auto pr-2">
        <div
          className="grid gap-2 [grid-template-columns:repeat(auto-fill,minmax(258px,1fr))]"
          data-pokemon-list
        >
          {data.map((pokemon) => (
            <div
              key={pokemon.name}
              className="min-w-0"
              data-pokemon-item
            >
              <PokemonRow pokemon={pokemon} onPress={onPress} />
            </div>
          ))}
        </div>
        {ListFooterComponent != null ? (
          <div className="shrink-0 py-2">{ListFooterComponent}</div>
        ) : null}
        <div
          ref={setSentinelRef}
          className="h-px w-full shrink-0"
          aria-hidden
        />
      </div>
    </section>
  );
}
