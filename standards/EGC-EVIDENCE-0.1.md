# Evidence Object & Authority Standard — `EGC-EVIDENCE-0.1`

> **Status:** Standards Track Draft 0.1  
> **Publisher:** SubstrateX®  
> **Originator:** Arjay Asadi  
> **Date:** October 2026  
> **Normative foundation:** *Foundations of Evidence-Governed Computation*, Paper VI, Version 2.0  
> **License:** Documentation/specification text is governed by the repository license.

## 1. Purpose

This specification defines a portable Evidence Object for EGC implementations independently of SubstrateX Aperture™, React, Vue, TypeScript, or any particular evidence domain.

## 2. Terminology correction: support class is not authority layer

EGC separates two concepts that MUST NOT be collapsed:

1. **Support/material class** describes what kind of evidentiary material a value represents (for example source, computed, derived, proxy, interpretive, experimental).
2. **Authority layer** describes what the system is permitted to do with that material (source authority, method authority, claim authority, presentation authority, recommendation authority, preservation authority).

A direct/source observation can still be false or incomplete. A derived measurement can be highly reliable. Neither class automatically grants a higher authority layer.

## 3. Minimum Evidence Object

```json
{
  "evidence_id": "ev-001",
  "context_id": "ctx-001",
  "version": "1",
  "support_class": "derived",
  "evidence_state": "available",
  "domain_state": "candidate",
  "value": {"frame": 20},
  "method": {"id": "boundary-detector", "version": "1.0.0"},
  "source_refs": [{"ref": "runtime:frame:20"}],
  "lineage": [],
  "scope": {},
  "uncertainty": {},
  "limitations": [],
  "authority": {},
  "disclosure": {}
}
```

Implementations MAY add fields but MUST preserve stable identity, context identity, support class, evidence state, method/source lineage for derived content, and relevant limitations.

## 4. Support classes

The base vocabulary is:

- `source` — supplied/observed source material preserved as evidence;
- `operator_declared` — a declaration provided by an identified operator;
- `contextual` — independently supplied contextual or environmental evidence;
- `computed` — deterministic computation directly over eligible evidence;
- `derived` — a method-dependent measurement/classification derived from evidence or admitted claims;
- `proxy` — a bounded proxy that does not directly observe the target construct;
- `interpretive` — an interpretation admitted under a declared interpretive rule;
- `experimental` — a construct not admitted as production/authoritative evidence without separate policy.

An implementation MAY define domain-specific support classes but MUST map them to one of the base classes or declare the extension explicitly.

## 5. Evidence state vs. domain state

EGC distinguishes whether evidence is **available/usable** from the domain-specific state it represents.

### 5.1 Evidence-state vocabulary

At minimum:

- `available`
- `partial`
- `not_observed`
- `not_supplied`
- `not_eligible`
- `not_computable`
- `below_detection_limit`
- `withheld`
- `unavailable`
- `conflicting`

### 5.2 Domain-state vocabulary

Domains MAY add states such as:

- `observed`
- `candidate`
- `confirmed`
- `resolved`
- `superseded`

A domain state MUST NOT erase the evidence-state semantics. For example, a value cannot be treated as `confirmed` when the evidence required to establish confirmation is `not_supplied`.

## 6. Layered authority

The Evidence Object MAY carry an `authority` profile but MUST NOT express authority as a single scalar certainty score.

The base authority layers are:

- **source authority** — permits representing what record was supplied/observed/attested under stated conditions;
- **method authority** — permits a declared method to operate on eligible inputs;
- **claim authority** — permits a typed proposition under evidence and contract;
- **presentation authority** — permits rendering an admitted claim without changing meaning/scope;
- **recommendation authority** — permits presenting an option under declared policy;
- **preservation authority** — permits an artifact to carry specified evidence/claim states forward.

No lower layer automatically grants a higher layer.

## 7. Lineage and dependencies

Derived, computed, proxy, interpretive, and experimental objects MUST declare enough dependency information to identify their parent evidence or admitted claims and the producing method/version.

Agreement among multiple outputs that share the same evidence/dependencies MUST NOT be represented as independent corroboration unless an independence criterion is declared and satisfied.

## 8. Identity and versioning

Changes to canonical content, method-relevant fields, evidence status, or claim-relevant limitations MUST be distinguishable by version, identity, or supersession lineage.

A hash MAY be used for identity/integrity, but a hash alone MUST NOT be interpreted as source truth, completeness, construct validity, or claim authority.

## 9. Machine-readable schema

The normative interchange schema is [`schemas/evidence-object.schema.json`](./schemas/evidence-object.schema.json).
