import { AUTHORITY_LEVELS, type EvidenceAuthority } from "./types.js";

const rank = new Map<EvidenceAuthority, number>(
  AUTHORITY_LEVELS.map((authority, index) => [authority, index]),
);

export function authorityRank(authority: EvidenceAuthority): number {
  return rank.get(authority) ?? -1;
}

export function authorityAtLeast(
  actual: EvidenceAuthority,
  required: EvidenceAuthority,
): boolean {
  return authorityRank(actual) >= authorityRank(required);
}

export function weakestAuthority(
  authorities: readonly EvidenceAuthority[],
): EvidenceAuthority | undefined {
  if (authorities.length === 0) return undefined;
  return authorities.reduce((weakest, current) =>
    authorityRank(current) < authorityRank(weakest) ? current : weakest,
  );
}
