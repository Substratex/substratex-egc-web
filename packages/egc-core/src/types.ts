export const AUTHORITY_LEVELS = [
  "experimental",
  "interpretive",
  "proxy",
  "derived",
  "direct",
] as const;

export type EvidenceAuthority = (typeof AUTHORITY_LEVELS)[number];

export const EVIDENCE_STATUSES = [
  "observed",
  "computed",
  "derived",
  "candidate",
  "confirmed",
  "not_observed",
  "not_supplied",
  "not_computable",
  "unsupported",
  "proxy_only",
  "unavailable",
] as const;

export type EvidenceStatus = (typeof EVIDENCE_STATUSES)[number];

export const LIMITATION_STATUSES: readonly EvidenceStatus[] = [
  "not_observed",
  "not_supplied",
  "not_computable",
  "unsupported",
  "proxy_only",
  "unavailable",
];

export interface EvidenceSource {
  kind: string;
  ref: string;
  coordinates?: Record<string, string | number>;
  hash?: string;
}

export interface EvidenceMethod {
  id: string;
  version: string;
  description?: string;
}

export interface EvidenceObject<T = unknown> {
  id: string;
  runId?: string;
  authority: EvidenceAuthority;
  status: EvidenceStatus;
  value?: T;
  source?: EvidenceSource;
  method?: EvidenceMethod;
  confidence?: number;
  limitations?: readonly string[];
  metadata?: Readonly<Record<string, unknown>>;
}

export interface EvidenceRequirement {
  evidenceId: string;
  statuses?: readonly EvidenceStatus[];
  minimumAuthority?: EvidenceAuthority;
  requireSourceTrail?: boolean;
  optional?: boolean;
}

export type ClaimFallback = Extract<
  EvidenceStatus,
  "not_observed" | "not_supplied" | "not_computable" | "unsupported" | "proxy_only" | "unavailable"
>;

export interface ClaimContract {
  id: string;
  label: string;
  requires: readonly EvidenceRequirement[];
  minimumAuthority?: EvidenceAuthority;
  permittedStatus?: EvidenceStatus;
  fallback: ClaimFallback;
  sourceTrail?: boolean;
  description?: string;
}

export interface EvidencePolicy {
  allowCrossRunEvidence: boolean;
  requireSourceTrailForDirectClaims: boolean;
  failClosed: boolean;
}

export interface EvidenceContext {
  runId: string;
  evidence: ReadonlyMap<string, Readonly<EvidenceObject>>;
  policy: Readonly<EvidencePolicy>;
  createdAt: string;
}

export type ClaimReasonCode =
  | "PERMITTED"
  | "MISSING_EVIDENCE"
  | "STATUS_MISMATCH"
  | "AUTHORITY_INSUFFICIENT"
  | "LINEAGE_UNAVAILABLE"
  | "RUN_MISMATCH";

export interface ClaimReason {
  code: ClaimReasonCode;
  evidenceId?: string;
  message: string;
}

export interface ClaimProjection {
  claimId: string;
  label: string;
  permitted: boolean;
  renderState: EvidenceStatus;
  authority?: EvidenceAuthority;
  support: readonly Readonly<EvidenceObject>[];
  reasons: readonly ClaimReason[];
  sourceTrail: readonly EvidenceSource[];
}
