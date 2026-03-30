"use client";

type PokemonSearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function PokemonSearchBar({
  value,
  onChange,
  placeholder = "Search by name ... ",
}: PokemonSearchProps) {
  return (
    <label className="flex w-full max-w-md flex-col gap-1 text-sm text-slate-700">
      <span className="sr-only">Search Pokémon</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-base text-black outline-none ring-slate-300 focus:ring-2"
        autoComplete="off"
      />
    </label>
  );
}
