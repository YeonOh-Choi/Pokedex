export type EvolutionChainLink = {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionChainLink[];
};

/** 분기 시 evolves_to[0]만 따라 한 줄 진화 이름 배열로 펼침 */
export function collectLinearSpeciesNames(node: EvolutionChainLink): string[] {
  const names = [node.species.name];
  const next = node.evolves_to[0];
  if (!next) return names;
  return names.concat(collectLinearSpeciesNames(next));
}

export function footerEvolutionTriplet(
  linearNames: string[],
  currentName: string,
): [string | null, string | null, string | null] {
  const key = currentName.toLowerCase();
  const i = linearNames.findIndex((n) => n.toLowerCase() === key);
  const n = linearNames.length;

  if (n === 0 || i === -1) {
    return [null, currentName, null];
  }

  if (n === 1) {
    return [linearNames[0], null, null];
  }

  if (i === 0) {
    return [linearNames[0], linearNames[1], n >= 3 ? linearNames[2] : null];
  }

  if (i === n - 1) {
    if (n >= 3) {
      return [linearNames[n - 3], linearNames[n - 2], linearNames[n - 1]];
    }
    return [null, linearNames[0], linearNames[1]];
  }

  return [linearNames[i - 1], linearNames[i], linearNames[i + 1]];
}
