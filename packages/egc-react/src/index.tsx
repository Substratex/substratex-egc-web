/**
 * React binding reference implementation.
 * This package is intentionally source-only in v0.1 so the core framework can
 * remain dependency-free. Applications compile it with their existing React toolchain.
 */
import React, { createContext, useContext, type ReactNode } from "react";
import {
  evaluateClaim,
  projectEvidence,
  type ClaimContract,
  type EvidenceContext,
} from "@substratex/egc-core";

const EGCContext = createContext<EvidenceContext | null>(null);

export function EvidenceProvider(props: { context: EvidenceContext; children: ReactNode }) {
  return <EGCContext.Provider value={props.context}>{props.children}</EGCContext.Provider>;
}

export function useEvidenceContext(): EvidenceContext {
  const context = useContext(EGCContext);
  if (!context) throw new Error("EvidenceProvider is required.");
  return context;
}

export function useEvidence(evidenceId: string) {
  return projectEvidence(useEvidenceContext(), evidenceId);
}

export function useClaim(contract: ClaimContract) {
  return evaluateClaim(useEvidenceContext(), contract);
}

export function EvidenceClaim(props: {
  contract: ClaimContract;
  children?: ReactNode;
  fallback?: ReactNode;
}) {
  const projection = useClaim(props.contract);
  if (!projection.permitted) return <>{props.fallback ?? projection.renderState}</>;
  return <>{props.children ?? projection.label}</>;
}

export function AuthorityGate(props: {
  contract: ClaimContract;
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const projection = useClaim(props.contract);
  return <>{projection.permitted ? props.children : props.fallback ?? null}</>;
}
