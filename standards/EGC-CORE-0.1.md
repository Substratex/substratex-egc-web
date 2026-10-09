# EGC Core Model Specification — `EGC-CORE-0.1`

> **Status:** Standards Track Draft 0.1  
> **Publisher:** SubstrateX®  
> **Originator:** Arjay Asadi  
> **Date:** October 2026  
> **Normative foundation:** *Foundations of Evidence-Governed Computation*, Paper VI, Version 2.0  
> **License:** Documentation/specification text is governed by the repository license.

## 1. Purpose

This specification defines the implementation-neutral constitutional model for Evidence-Governed Computation on web and application surfaces.

The web profile can be summarized as:

```text
Evidence Object
   ↓
Evidence / Method Authority
   ↓
Claim Contract + Admissibility
   ↓
Bounded Projection
   ↓
Governed Surface
```

This is a profile of the broader EGC system model, not a replacement for it.

## 2. Governing definition

A system is evidence-governed when every authoritative output:

1. derives from an identified evidence object or admitted parent claim;
2. is produced under declared methods and versions;
3. satisfies an executable claim boundary;
4. preserves status, scope, uncertainty, missingness, and limitations; and
5. retains sufficient lineage for independent inspection and challenge.

An output is **authoritative** only in the limited EGC sense: the system presents it as evidence-supported under a stated contract. EGC authority is not a synonym for truth, certification, legality, or scientific validity.

## 3. Core objects

A conforming web implementation MUST distinguish at least:

- **Evidence Object** — identified evidence and its source/derivation state;
- **Evidence Context** — the active identity and policy boundary within which evidence is evaluated;
- **Computation/Method Contract** — eligible inputs, method identity, dependencies, versions, and deterministic/volatile boundaries;
- **Claim Contract** — machine-readable requirements under which a normalized claim may be admitted;
- **Claim Object** — the admitted, conditional, disputed, withheld, not-computable, or prohibited proposition;
- **Bounded Projection** — a representation of admitted claims that cannot amplify authority;
- **Surface Binding** — the inspectable relationship connecting a rendered/machine-readable output to evidence, claim, method, scope, status, and version.

## 4. Evidence Context

An **Evidence Context** is the web-profile counterpart of an active evidence authority/run boundary. It MUST provide a stable context identity and MUST prevent accidental mixing of evidence from unrelated contexts unless a declared cross-context contract permits it.

At minimum:

```json
{
  "context_id": "ctx-001",
  "contract_bundle": "egc-bundle-1.0.0",
  "evidence": [],
  "claims": [],
  "policy": {}
}
```

Changing canonical evidence, a claim-relevant method, or admissibility policy MUST produce distinguishable version/context identity or retained revision lineage.

## 5. Authority non-creation / Non-Mutation Law

> **A component may consume evidence and admitted claims, but it MUST NOT create evidentiary authority merely by computing, summarizing, visualizing, or displaying them.**

Consequences:

- a chart MUST NOT turn `candidate` into `confirmed`;
- a generated narrative MUST NOT turn association into causation without a separately admissible claim;
- an interface MAY change layout, wording, or level of detail only within a permitted rendering contract;
- local component state MUST NOT mutate canonical evidence status or claim status;
- experimental computation MUST remain structurally distinguishable from authoritative claims until separately admitted.

## 6. Claim admissibility

For claim `c`, evidence context `E`, and contract `C`, the web profile adopts the EGC admissibility relation:

```text
E ⊢[C] c  iff
Src ∧ Qual ∧ Meth ∧ Scope ∧ Bound ∧ Unc ∧ Lineage
```

Where:

- `Src` — required evidence or admitted parent claims are addressable;
- `Qual` — evidence satisfies qualification/eligibility requirements;
- `Meth` — declared method/version operated on eligible inputs;
- `Scope` — temporal, operational, population, and audience scope are preserved;
- `Bound` — the proposition does not cross a prohibited claim boundary;
- `Unc` — required uncertainty, missingness, conflict, and confidence disclosures exist;
- `Lineage` — the derivation path is reconstructable.

A failed REQUIRED predicate MUST produce explicit non-admission, typed absence, conditionality, or prohibition—not a fabricated fallback assertion.

## 7. Bounded projection

For projection `π` and admitted claim set `Adm*(E,C)`:

```text
Claims(π(E)) ⊆ Adm*(E,C)
```

A projection MAY expose fewer claims than are available. It MUST NOT introduce a stronger claim, silently broaden scope, erase conditions, or transform proxy/experimental support into direct observation.

## 8. Surface binding and egress closure

Every authoritative surface output MUST have a valid surface binding. Every authoritative egress channel MUST pass through the same admissibility gate, including:

- labels, charts, tables, and tooltips;
- APIs and webhooks;
- alerts and notifications;
- generated explanations and summaries;
- recommendations;
- downloads and reports;
- downstream agent/system transfers.

Logging an unsupported output after emission does not satisfy EGC. Admission MUST occur before the system represents the output as authoritative.

## 9. Twelve architectural invariants

A baseline EGC implementation MUST preserve these invariants:

1. **Source addressability** — authoritative claims resolve to qualified sources or admitted parents.
2. **Authority non-creation** — computation/display cannot manufacture authority.
3. **Method declaration** — derived claims identify method, version, eligible inputs, and dependencies.
4. **Claim typing** — authoritative propositions have normalized identity and claim class.
5. **Scope preservation** — scope cannot silently broaden downstream.
6. **Missingness preservation** — absence, conflict, ineligibility, and non-computability remain distinct.
7. **Projection non-amplification** — projections stay within the admitted claim set/declared closure.
8. **Surface binding** — authoritative outputs bind evidence, claim, method, status, scope, and version.
9. **Egress closure** — every outward authoritative channel passes the claim gate.
10. **Version distinguishability** — evidence, method, policy, and presentation changes remain identifiable.
11. **Challenge retention** — challenges, counterevidence, review, and supersession remain attached.
12. **Preservation fidelity** — export preserves or discloses loss of identity, lineage, boundaries, and status.

## 10. Cross-surface congruence

Given the same evidence context and computation contract, conforming surfaces MAY differ in presentation but MUST resolve equivalent authoritative propositions to the same normalized claim identities and preserve scope, status, uncertainty, and limitations.

A surface showing `candidate boundary` while another shows `confirmed failure` for the same normalized claim and context is non-conforming unless the outputs explicitly reference different evidence/contract versions.

## 11. Conformance

Conformance to this document requires satisfying the Core profile in `EGC-CONFORMANCE-0.1` and the applicable Evidence, Claim, UI, and Interchange profiles.
