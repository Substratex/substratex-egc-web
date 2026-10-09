/** Vue binding reference implementation (source-only in v0.1). */
import { inject, type App, type InjectionKey } from "vue";
import {
  evaluateClaim,
  projectEvidence,
  type ClaimContract,
  type EvidenceContext,
} from "@substratex/egc-core";

const EGC_KEY: InjectionKey<EvidenceContext> = Symbol("SubstrateX EGC Context");

export function createEGCPlugin(context: EvidenceContext) {
  return {
    install(app: App) {
      app.provide(EGC_KEY, context);
    },
  };
}

export function useEvidenceContext(): EvidenceContext {
  const context = inject(EGC_KEY);
  if (!context) throw new Error("SubstrateX EGC plugin is required.");
  return context;
}

export function useEvidence(evidenceId: string) {
  return projectEvidence(useEvidenceContext(), evidenceId);
}

export function useClaim(contract: ClaimContract) {
  return evaluateClaim(useEvidenceContext(), contract);
}
