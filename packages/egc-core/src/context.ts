import type {
  EvidenceContext,
  EvidenceObject,
  EvidencePolicy,
} from "./types.js";

export const DEFAULT_POLICY: Readonly<EvidencePolicy> = Object.freeze({
  allowCrossRunEvidence: false,
  requireSourceTrailForDirectClaims: true,
  failClosed: true,
});

function freezeEvidence<T>(evidence: EvidenceObject<T>): Readonly<EvidenceObject<T>> {
  return Object.freeze({
    ...evidence,
    source: evidence.source ? Object.freeze({ ...evidence.source }) : undefined,
    method: evidence.method ? Object.freeze({ ...evidence.method }) : undefined,
    limitations: evidence.limitations ? Object.freeze([...evidence.limitations]) : undefined,
    metadata: evidence.metadata ? Object.freeze({ ...evidence.metadata }) : undefined,
  });
}

export function createEvidenceContext(input: {
  runId: string;
  evidence?: readonly EvidenceObject[];
  policy?: Partial<EvidencePolicy>;
  createdAt?: string;
}): EvidenceContext {
  const policy = Object.freeze({ ...DEFAULT_POLICY, ...input.policy });
  const registry = new Map<string, Readonly<EvidenceObject>>();

  for (const item of input.evidence ?? []) {
    if (registry.has(item.id)) {
      throw new Error(`Duplicate evidence id: ${item.id}`);
    }
    if (!policy.allowCrossRunEvidence && item.runId && item.runId !== input.runId) {
      throw new Error(
        `Evidence ${item.id} belongs to run ${item.runId}, not context ${input.runId}`,
      );
    }
    registry.set(item.id, freezeEvidence({ ...item, runId: item.runId ?? input.runId }));
  }

  return Object.freeze({
    runId: input.runId,
    evidence: registry,
    policy,
    createdAt: input.createdAt ?? new Date().toISOString(),
  });
}

export function withEvidence(
  context: EvidenceContext,
  additions: readonly EvidenceObject[],
): EvidenceContext {
  return createEvidenceContext({
    runId: context.runId,
    evidence: [...context.evidence.values(), ...additions],
    policy: context.policy,
  });
}
