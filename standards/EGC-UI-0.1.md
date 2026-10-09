# Evidence-Bound UI Standard — `EGC-UI-0.1`

> **Status:** Standards Track Draft 0.1  
> **Publisher:** SubstrateX®  
> **Originator:** Arjay Asadi  
> **Date:** October 2026  
> **Normative foundation:** *Foundations of Evidence-Governed Computation*, Paper VI, Version 2.0  
> **License:** Documentation/specification text is governed by the repository license.

## 1. Purpose

This specification governs consequential outputs rendered through user interfaces and other presentation surfaces.

> **A consequential UI representation MUST derive its authoritative claim state from an admitted EGC claim and MUST NOT independently promote evidence authority.**

React, Vue, Web Components, native applications, dashboards, APIs, and generated narratives are implementation surfaces. They are not independent truth authorities.

## 2. Consequential output

A **consequential output** is any label, value, classification, interpretation, recommendation, alert, summary, chart title, status badge, API field, or export assertion that the system presents as evidence-supported or permits a downstream consumer to treat as such.

Decorative or exploratory content MAY exist outside authoritative binding, but it MUST be structurally/visibly distinguished from admitted claims when confusion is plausible.

## 3. Surface binding

Every authoritative output MUST resolve a binding equivalent to:

```json
{
  "surface_id": "operator-brief.summary-04",
  "output_id": "output-001",
  "context_id": "ctx-001",
  "evidence_ref": "ev-001",
  "claim_id": "claim-001",
  "method": {"id": "m-001", "version": "1.0.0"},
  "scope": {},
  "status": "admissible",
  "rendering_contract": "render-001",
  "forbidden_claims": [],
  "disclosure": {},
  "version": "1"
}
```

The normative schema is [`schemas/surface-binding.schema.json`](./schemas/surface-binding.schema.json).

## 4. Evidence-bound component semantics

Framework adapters MAY expose components such as:

- `EvidenceClaim`
- `EvidenceValue`
- `AuthorityState`
- `AuthorityGate`
- `Missingness`
- `EvidenceStatus`
- `SourceTrail`
- `Provenance`
- `ClaimBoundary`
- `EvidenceWarning`
- `UnsupportedClaim`

Names are non-normative. Behavior is normative.

A governed component:

1. MUST consume a bounded projection or claim evaluation, not invent claim status locally;
2. MUST preserve typed absence/missingness;
3. MUST NOT mutate canonical evidence or claim authority;
4. MUST preserve or expose the active claim/status identity;
5. MUST NOT silently remove conditions/limitations required by the rendering contract;
6. SHOULD expose inspection hooks for source/method/lineage where appropriate to the application.

## 5. Presentation authority

Presentation authority permits a surface to render an admitted claim. It does not authorize the surface to create a new interpretation.

Presentation changes MAY alter layout, typography, visualization geometry, explanatory detail, or domain vocabulary when semantically congruent.

They MUST NOT alter normalized proposition, admissibility/status, canonical evidence identity, claim-relevant method identity, scope, required uncertainty/missingness disclosure, or prohibited interpretations.

## 6. Cross-surface congruence

For the same evidence/contract version, equivalent claims across pages, tooltips, mobile layouts, exports, APIs, and generated summaries MUST preserve the same normalized claim identity and claim status.

A UI state that says `confirmed` while the canonical claim is `candidate` is a conformance failure, not a cosmetic inconsistency.

## 7. Egress closure

The application MUST identify all authoritative egress surfaces and route them through a common admission/binding mechanism. Protecting only the primary dashboard while allowing an API, notification, generated summary, or export to bypass governance is non-conforming.

## 8. Local state

Local filters, tabs, caches, selections, annotations, animation, and viewport state MAY affect presentation. They MUST NOT silently mutate canonical evidence, admit stronger claims, or alter evidence/claim status.

If an operator changes a threshold or interpretation rule that affects claim admissibility, the change MUST be represented as a declared method/policy/contract version rather than transient UI state.

## 9. Surface Binding Audit

A conforming implementation MUST be able to enumerate authoritative outputs and verify for each:

- stable claim identity;
- evidence/context binding;
- source/parent lineage where required;
- method/version identity;
- scope preservation;
- status/uncertainty/missingness preservation;
- permitted rendering;
- forbidden-extension compliance;
- export equivalence where applicable.

## 10. Developer mode

Implementations SHOULD provide a developer inspection view that makes the path visible:

```text
rendered output
  ↓
normalized claim
  ↓
claim contract
  ↓
supporting evidence / parent claims
  ↓
method + version
  ↓
source lineage
```

This is recommended developer tooling, not a required end-user presentation.
