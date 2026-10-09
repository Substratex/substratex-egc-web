# EGC Conformance Standard — `EGC-CONFORMANCE-0.1`

> **Status:** Standards Track Draft 0.1  
> **Publisher:** SubstrateX®  
> **Originator:** Arjay Asadi  
> **Date:** October 2026  
> **Normative foundation:** *Foundations of Evidence-Governed Computation*, Paper VI, Version 2.0  
> **License:** Documentation/specification text is governed by the repository license.

## 1. Purpose

This specification defines testable conformance profiles for Evidence-Governed Computation implementations. Conformance is architectural and procedural; it is not SubstrateX certification, factual certification, security certification, or scientific validation.

## 2. Conformance profiles

An implementation MAY claim one or more of the following profiles only when all REQUIRED criteria for that profile pass:

### 2.1 `EGC Core Conformant`
Preserves the core constitutional model, authority non-creation, version distinguishability, typed missingness, and inspectable authority paths.

### 2.2 `EGC Evidence Conformant`
Implements `EGC-EVIDENCE-0.1`, including stable identity, context identity, support/material classification, evidence-state semantics, source/method lineage, and limitations.

### 2.3 `EGC Claim Conformant`
Implements `EGC-CLAIM-0.1`, including machine-readable claim contracts, admission/refusal, normalized claim identity, scope, prohibited extensions, and absence behavior.

### 2.4 `EGC UI Conformant`
Implements `EGC-UI-0.1`, including surface binding, bounded rendering, cross-surface congruence, and egress closure for all declared authoritative UI outputs.

### 2.5 `EGC JSON Interchange Conformant`
Implements the required envelope/object serialization and version semantics of `EGC-JSON-0.1`.

## 3. Violation code registry

| Code | Name | Meaning |
| --- | --- | --- |
| `EGC101` | `REQUIRED_EVIDENCE_MISSING` | Required evidence object absent |
| `EGC102` | `STATUS_MISMATCH` | Evidence/claim state does not satisfy contract |
| `EGC103` | `AUTHORITY_INSUFFICIENT` | Required support/authority predicate not met |
| `EGC104` | `LINEAGE_UNAVAILABLE` | Required source/method lineage unavailable |
| `EGC105` | `MISSINGNESS_COLLAPSE` | Distinct absence/value states were substituted |
| `EGC201` | `AUTHORITY_ESCALATION` | Output expresses stronger authority than support permits |
| `EGC202` | `CANDIDATE_PROMOTED` | Candidate/provisional state promoted toward confirmation |
| `EGC203` | `UNBOUND_CLAIM` | Consequential output lacks a Claim Contract/surface binding |
| `EGC204` | `SCOPE_BROADENED` | Temporal/operational/audience scope silently expanded |
| `EGC205` | `FORBIDDEN_EXTENSION` | Rendering implies an explicitly prohibited proposition |
| `EGC301` | `CONTEXT_IDENTITY_MISMATCH` | Evidence/claim does not belong to active declared context |
| `EGC302` | `VERSION_AMBIGUITY` | Claim-relevant evidence/method/policy version is not distinguishable |
| `EGC401` | `SURFACE_BINDING_INVALID` | Surface output cannot resolve its complete authority path |
| `EGC402` | `EGRESS_BYPASS` | Authoritative output bypassed the claim gate |
| `EGC403` | `CROSS_SURFACE_INCONGRUENCE` | Equivalent claim diverged across surfaces |
| `EGC501` | `CHALLENGE_STATE_LOST` | Challenge/supersession state was dropped |
| `EGC502` | `PRESERVATION_FIDELITY_LOSS` | Export lost authority-critical semantics without disclosure |

Implementations MAY define vendor/domain codes but MUST NOT redefine the meaning of registered codes.

## 4. Minimum test families

A baseline conforming implementation MUST support tests for:

1. **Source-span traceability** — authoritative claims traverse to qualified source or admitted parents.
2. **Deterministic-core recomputation** — fixed evidence and contract inputs reproduce the declared deterministic core where determinism is claimed.
3. **Policy rejection** — ineligible inputs produce explicit non-admission, not fallback invention.
4. **Projection congruence** — equivalent claims remain semantically congruent across surfaces.
5. **Surface Binding Audit** — every authoritative surface output resolves its binding.
6. **Missingness differentiation** — removed/corrupt inputs produce distinct typed states.
7. **Temporal leakage** — an output asserted at time `t` does not depend on later evidence unless explicitly retrospective.
8. **Version separation** — evidence, method, and policy changes remain distinguishable with retained lineage.
9. **Export round trip** — authoritative core, status, boundaries, and disclosed redactions survive export/re-import within the declared profile.
10. **Challenge propagation** — challenge/dispute/supersession appears on every bound surface/artifact without erasing history.
11. **Narrative proposition containment** — generated summaries do not broaden, causalize, or inflate certainty beyond admitted claims.
12. **Adversarial source isolation** — source text/instructions remain evidence content and do not become executable system policy merely by ingestion.

## 5. Baseline conformance assertions

A system seeking baseline conformance MUST be able to demonstrate that:

- authoritative outputs have stable evidence/claim identities;
- material/support classes are distinguishable;
- evidence, method, policy, schema, release, and presentation versions are identifiable where claim-relevant;
- eligible inputs, transformations, thresholds/horizons, and dependencies are declared for derived claims;
- claim class, source basis, scope, assumptions, uncertainty, boundary, forbidden claims, disclosure state, and status are machine-readable;
- missing/conflicting/withheld/partial/unavailable/not-computable states are preserved;
- every governed instrument/component has a bounded contract;
- all declared egress surfaces pass a Surface Binding Audit;
- generated language is testable against admitted claims/permitted renderings;
- dependent outputs are not presented as independent corroboration without a declared independence basis.

## 6. Claiming conformance

A project SHOULD publish:

```text
EGC conformance profile(s):
Specification version(s):
Implementation version:
Test suite version:
Known exceptions:
Non-certifications:
```

Projects MUST NOT describe conformance as "EGC Certified" or "SubstrateX Certified" without separate authorization.

## 7. Fixtures

Canonical pass/fail fixtures are provided in [`fixtures/`](./fixtures/). Implementations are encouraged to run these fixtures independent of the SubstrateX reference SDK.
