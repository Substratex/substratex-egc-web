import type { EvidenceContext, EvidenceObject } from "./types.js";
export interface EvidenceProjection<T = unknown> {
    id: string;
    status: EvidenceObject<T>["status"];
    authority: EvidenceObject<T>["authority"];
    value?: T;
    sourceBound: boolean;
    limitations: readonly string[];
}
export declare function projectEvidence<T = unknown>(context: EvidenceContext, evidenceId: string): EvidenceProjection<T> | undefined;
//# sourceMappingURL=projection.d.ts.map