import type { EvidenceContext, EvidenceObject } from "./types.js";

export interface EvidenceProjection<T = unknown> {
  id: string;
  status: EvidenceObject<T>["status"];
  authority: EvidenceObject<T>["authority"];
  value?: T;
  sourceBound: boolean;
  limitations: readonly string[];
}

export function projectEvidence<T = unknown>(
  context: EvidenceContext,
  evidenceId: string,
): EvidenceProjection<T> | undefined {
  const evidence = context.evidence.get(evidenceId) as Readonly<EvidenceObject<T>> | undefined;
  if (!evidence) return undefined;

  return Object.freeze({
    id: evidence.id,
    status: evidence.status,
    authority: evidence.authority,
    value: evidence.value,
    sourceBound: Boolean(evidence.source),
    limitations: Object.freeze([...(evidence.limitations ?? [])]),
  });
}
