import {
  authorityAtLeast,
  evaluateClaim,
  type ClaimContract,
  type EvidenceContext,
  type EvidenceObject,
} from "../../egc-core/dist/index.js";

export type EGCViolationCode =
  | "EGC101"
  | "EGC102"
  | "EGC103"
  | "EGC104"
  | "EGC201"
  | "EGC202"
  | "EGC301";

export interface EGCViolation {
  code: EGCViolationCode;
  severity: "error" | "warning";
  message: string;
  claimId?: string;
  evidenceId?: string;
}

export function validateEvidenceObject(
  context: EvidenceContext,
  evidence: Readonly<EvidenceObject>,
): readonly EGCViolation[] {
  const violations: EGCViolation[] = [];

  if (!context.policy.allowCrossRunEvidence && evidence.runId !== context.runId) {
    violations.push({
      code: "EGC301",
      severity: "error",
      evidenceId: evidence.id,
      message: `Evidence run '${evidence.runId}' does not match context '${context.runId}'.`,
    });
  }

  if (evidence.authority === "direct" && !evidence.source) {
    violations.push({
      code: "EGC104",
      severity: "error",
      evidenceId: evidence.id,
      message: "Direct evidence is missing a source trail.",
    });
  }

  if (evidence.status === "confirmed" && evidence.authority === "experimental") {
    violations.push({
      code: "EGC201",
      severity: "warning",
      evidenceId: evidence.id,
      message: "Confirmed state is backed only by experimental authority.",
    });
  }

  return Object.freeze(violations);
}

export function validateClaimContract(
  context: EvidenceContext,
  contract: ClaimContract,
): readonly EGCViolation[] {
  const result = evaluateClaim(context, contract);
  if (result.permitted) return Object.freeze([]);

  return Object.freeze(
    result.reasons.flatMap((reason): EGCViolation[] => {
      switch (reason.code) {
        case "MISSING_EVIDENCE":
          return [{ code: "EGC101", severity: "error", claimId: contract.id, evidenceId: reason.evidenceId, message: reason.message }];
        case "STATUS_MISMATCH": {
          const evidence = reason.evidenceId ? context.evidence.get(reason.evidenceId) : undefined;
          const requestedConfirmed = contract.requires.some(
            (requirement) => requirement.evidenceId === reason.evidenceId && requirement.statuses?.includes("confirmed"),
          );
          const candidatePromotion = requestedConfirmed && evidence?.status === "candidate";
          return [{
            code: candidatePromotion ? "EGC202" : "EGC102",
            severity: "error",
            claimId: contract.id,
            evidenceId: reason.evidenceId,
            message: reason.message,
          }];
        }
        case "AUTHORITY_INSUFFICIENT":
          return [{ code: "EGC103", severity: "error", claimId: contract.id, evidenceId: reason.evidenceId, message: reason.message }];
        case "LINEAGE_UNAVAILABLE":
          return [{ code: "EGC104", severity: "error", claimId: contract.id, evidenceId: reason.evidenceId, message: reason.message }];
        case "RUN_MISMATCH":
          return [{ code: "EGC301", severity: "error", claimId: contract.id, evidenceId: reason.evidenceId, message: reason.message }];
        case "PERMITTED":
          return [];
      }
    }),
  );
}

export function validateContext(
  context: EvidenceContext,
  contracts: readonly ClaimContract[] = [],
): readonly EGCViolation[] {
  return Object.freeze([
    ...[...context.evidence.values()].flatMap((evidence) => validateEvidenceObject(context, evidence)),
    ...contracts.flatMap((contract) => validateClaimContract(context, contract)),
  ]);
}

export function assertAuthority(
  actual: EvidenceObject["authority"],
  required: EvidenceObject["authority"],
): void {
  if (!authorityAtLeast(actual, required)) {
    throw new Error(`Evidence authority '${actual}' does not satisfy '${required}'.`);
  }
}
