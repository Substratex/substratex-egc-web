import type { EvidenceContext, EvidenceObject, EvidencePolicy } from "./types.js";
export declare const DEFAULT_POLICY: Readonly<EvidencePolicy>;
export declare function createEvidenceContext(input: {
    runId: string;
    evidence?: readonly EvidenceObject[];
    policy?: Partial<EvidencePolicy>;
    createdAt?: string;
}): EvidenceContext;
export declare function withEvidence(context: EvidenceContext, additions: readonly EvidenceObject[]): EvidenceContext;
//# sourceMappingURL=context.d.ts.map