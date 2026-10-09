# EGC Claim Contract Standard — `EGC-CLAIM-0.1`

> **Status:** Standards Track Draft 0.1  
> **Publisher:** SubstrateX®  
> **Originator:** Arjay Asadi  
> **Date:** October 2026  
> **Normative foundation:** *Foundations of Evidence-Governed Computation*, Paper VI, Version 2.0  
> **License:** Documentation/specification text is governed by the repository license.

## A Machine-Readable Contract Between Evidence and Interface Claims

## 1. Purpose

This specification defines the **Claim Contract**, the executable relation between available evidence and the propositions a computational system is permitted to represent as evidence-supported.

```text
data exists
≠
claim is authorized
```

The Claim Contract supplies the missing relation:

```text
DATA
  ↓
EVIDENCE
  ↓
METHOD / AUTHORITY
  ↓
CLAIM CONTRACT
  ↓
ADMITTED CLAIM
  ↓
BOUNDED PROJECTION
  ↓
UI / API / REPORT / AGENT
```

## 2. Claim as computational object

A consequential claim MUST have a stable normalized identity before presentation. Its visible sentence or chart label is a rendering of that normalized claim—not the claim's sole representation.

A claim MUST be able to carry:

- claim identifier and class;
- normalized proposition/schema;
- evidence requirements and/or admitted parent claims;
- method and version requirements;
- temporal, operational, population, and audience scope;
- assumptions and uncertainty requirements;
- claim boundary and forbidden extensions;
- permitted renderings;
- absence behavior;
- status;
- disclosure/export rules;
- challenge/supersession lineage where applicable.

## 3. Claim classes

The base classes are:

- `source_statement`
- `derived_measurement`
- `protocol_classification`
- `supported_interpretation`
- `contextual_assertion`
- `recommendation`

Extensions MAY define additional classes but MUST declare their minimum support and prohibited substitutions.

## 4. Claim status

At minimum:

- `admissible`
- `conditional`
- `provisional`
- `disputed`
- `superseded`
- `withheld`
- `not_computable`
- `prohibited`

Status is part of the claim object. It MUST NOT exist only as color, decoration, tooltip text, or transient UI state.

## 5. Claim Contract object

```json
{
  "claim_id": "failure-confirmed",
  "claim_class": "protocol_classification",
  "proposition_schema": {"type": "failure_confirmation"},
  "requires": [
    {
      "evidence": "basin_exit",
      "domain_state": ["confirmed"],
      "minimum_support_class": "derived"
    },
    {
      "evidence": "observable_failure",
      "domain_state": ["observed"],
      "minimum_support_class": "source",
      "require_source_ref": true
    }
  ],
  "method": {"id": "failure-formation", "version": "1.0.0"},
  "scope": {},
  "uncertainty_rule": {},
  "allowed_renderings": ["Failure confirmed"],
  "forbidden_extensions": ["Failure caused by basin exit"],
  "absence_behavior": "not_computable",
  "export_policy": {},
  "version": "0.1"
}
```

## 6. Admission algorithm

An implementation MUST evaluate all applicable predicates:

```text
Src ∧ Qual ∧ Meth ∧ Scope ∧ Bound ∧ Unc ∧ Lineage
```

If any REQUIRED predicate fails, the system MUST NOT emit the normalized claim as `admissible`.

The implementation MUST return a machine-readable refusal/conditional status and SHOULD provide stable reason codes.

## 7. Parent claims and restricted closure

Claims MAY derive from admitted parent claims only through a declared and versioned rule. A language model, rule engine, or summary component MUST NOT infer arbitrary stronger consequences from admitted claims.

The narrowest relevant scope and limitations of parent claims MUST propagate unless the contract explicitly establishes a separately supported extension.

## 8. Allowed renderings

Multiple surfaces MAY render the same normalized claim differently when the renderings preserve:

- proposition identity;
- scope;
- status;
- uncertainty;
- limitations;
- prohibited interpretations.

Changing `increased after` to `caused` creates a different claim and requires separate admission.

## 9. Forbidden extensions

Every consequential contract SHOULD identify stronger interpretations that the output MUST NOT imply. Examples:

- correlation → causation;
- candidate → confirmed;
- source role label → verified identity;
- not observed → did not occur;
- proxy measurement → direct observation;
- recommendation → required action.

## 10. Absence behavior

Every contract MUST state what happens when a required input is absent, withheld, ineligible, conflicting, or not computable. Silent substitution is prohibited.

## 11. Schema

The normative interchange schema is [`schemas/claim-contract.schema.json`](./schemas/claim-contract.schema.json).
