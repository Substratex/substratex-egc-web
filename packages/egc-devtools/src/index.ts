import {
  evaluateClaim,
  type ClaimContract,
  type EvidenceContext,
} from "../../egc-core/dist/index.js";

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

export function inspectEvidenceGraph(
  context: EvidenceContext,
  contracts: readonly ClaimContract[],
): EvidenceInspectorSnapshot {
  const claims = contracts.map((contract) => {
    const projection = evaluateClaim(context, contract);
    return Object.freeze({
      claimId: projection.claimId,
      label: projection.label,
      permitted: projection.permitted,
      renderState: projection.renderState,
      authority: projection.authority,
      evidence: Object.freeze(
        projection.support.map((item) => Object.freeze({
          id: item.id,
          status: item.status,
          authority: item.authority,
          source: item.source?.ref,
        })),
      ),
      reasons: Object.freeze(projection.reasons.map((reason) => reason.message)),
    });
  });

  return Object.freeze({
    runId: context.runId,
    createdAt: new Date().toISOString(),
    claims: Object.freeze(claims),
  });
}
