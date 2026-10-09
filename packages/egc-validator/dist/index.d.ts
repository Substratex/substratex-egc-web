import { type ClaimContract, type EvidenceContext, type EvidenceObject } from "../../egc-core/dist/index.js";
export type EGCViolationCode = "EGC101" | "EGC102" | "EGC103" | "EGC104" | "EGC201" | "EGC202" | "EGC301";
export interface EGCViolation {
    code: EGCViolationCode;
    severity: "error" | "warning";
    message: string;
    claimId?: string;
    evidenceId?: string;
}
export declare function validateEvidenceObject(context: EvidenceContext, evidence: Readonly<EvidenceObject>): readonly EGCViolation[];
export declare function validateClaimContract(context: EvidenceContext, contract: ClaimContract): readonly EGCViolation[];
export declare function validateContext(context: EvidenceContext, contracts?: readonly ClaimContract[]): readonly EGCViolation[];
export declare function assertAuthority(actual: EvidenceObject["authority"], required: EvidenceObject["authority"]): void;
//# sourceMappingURL=index.d.ts.map