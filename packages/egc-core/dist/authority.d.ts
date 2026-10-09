import { type EvidenceAuthority } from "./types.js";
export declare function authorityRank(authority: EvidenceAuthority): number;
export declare function authorityAtLeast(actual: EvidenceAuthority, required: EvidenceAuthority): boolean;
export declare function weakestAuthority(authorities: readonly EvidenceAuthority[]): EvidenceAuthority | undefined;
//# sourceMappingURL=authority.d.ts.map