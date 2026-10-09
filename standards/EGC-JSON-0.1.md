# EGC Interchange Format — `EGC-JSON-0.1`

> **Status:** Standards Track Draft 0.1  
> **Publisher:** SubstrateX®  
> **Originator:** Arjay Asadi  
> **Date:** October 2026  
> **Normative foundation:** *Foundations of Evidence-Governed Computation*, Paper VI, Version 2.0  
> **License:** Documentation/specification text is governed by the repository license.

## 1. Purpose

This specification defines a framework-neutral JSON interchange envelope for EGC Evidence Objects, Claim Contracts, Claim Evaluations, Surface Bindings, lineage references, challenge state, and bounded projections.

The purpose is interoperability across JavaScript/TypeScript, Python, Java, Rust, browser-local applications, services, archives, and independent implementations.

## 2. Media profile

Draft 0.1 defines a JSON representation. No dedicated IANA media type is claimed at this stage.

Implementations SHOULD label documents with:

```json
{
  "egc_spec": "0.1",
  "document_type": "egc_bundle"
}
```

## 3. Bundle envelope

```json
{
  "egc_spec": "0.1",
  "document_type": "egc_bundle",
  "context": {
    "context_id": "ctx-001",
    "contract_bundle": "egc-bundle-1.0.0"
  },
  "evidence": [],
  "claim_contracts": [],
  "claim_evaluations": [],
  "surface_bindings": [],
  "challenges": [],
  "extensions": {}
}
```

## 4. Serialization rules

- JSON property order MUST NOT carry semantic meaning.
- Identifiers MUST be stable within the declared context/version.
- Unknown extension fields SHOULD be preserved during round-trip when feasible.
- A consumer MUST NOT silently coerce an unknown evidence/claim status into a stronger known state.
- `null`, missing property, typed absence state, `false`, `0`, and empty string MUST remain distinguishable.
- Timestamps, when used, SHOULD use RFC 3339-compatible representations, but domain symbolic/runtime coordinates MAY use declared coordinate schemas instead.

## 5. Versioning

Every document MUST declare `egc_spec`. Objects that can change independently SHOULD carry their own version or immutable identity/supersession relation.

A consumer encountering an unsupported major/incompatible version MUST fail safely or treat the object as unsupported; it MUST NOT assume equivalence.

## 6. JSON Schema

Draft 0.1 provides JSON Schemas for Evidence Object, Claim Contract, Surface Binding, and EGC Bundle Envelope.

Schema validity is necessary but not sufficient for EGC conformance. Semantic conformance requires admissibility, non-amplification, surface binding, missingness, and other invariants.

## 7. JSON-LD

Implementations MAY provide JSON-LD contexts for globally identified vocabularies. JSON-LD is optional in 0.1 and MUST NOT be required for baseline EGC JSON conformance.

## 8. Provenance interoperability

Lineage MAY map to external provenance models such as W3C PROV. External provenance identifiers MUST remain distinguishable from EGC claim authority. A complete provenance graph does not by itself make a claim admissible.

## 9. Observability references

Evidence `source_refs` MAY point to OpenTelemetry trace/span/event identifiers or other telemetry systems. Such references identify source material; they do not automatically establish completeness, truth, independence, or claim authority.

## 10. Integrity and hashing

EGC-JSON-0.1 does not prescribe a universal canonical JSON/hash algorithm. If an implementation hashes/signs an EGC document, it MUST declare canonicalization method/profile, digest/signature algorithm, included scope, excluded/volatile fields, and governing schema/contract versions.

A digest proves only the integrity/identity property defined by that profile; it MUST NOT be represented as semantic truth.
