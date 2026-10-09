import { type ClaimContract, type EvidenceContext } from "../../egc-core/dist/index.js";
export interface ClaimInspection {
    claimId: string;
    label: string;
    permitted: boolean;
    renderState: string;
    authority?: string;
    evidence: readonly {
        id: string;
        status: string;
        authority: string;
        source?: string;
    }[];
    reasons: readonly string[];
}
export interface EvidenceInspectorSnapshot {
    runId: string;
    createdAt: string;
    claims: readonly ClaimInspection[];
}
export declare function inspectEvidenceGraph(context: EvidenceContext, contracts: readonly ClaimContract[]): EvidenceInspectorSnapshot;
//# sourceMappingURL=index.d.ts.map