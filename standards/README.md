# Evidence-Governed Computation Web Specifications

> **Status:** Standards Track Draft 0.1  
> **Publisher:** SubstrateX®  
> **Originator:** Arjay Asadi  
> **Date:** October 2026  
> **Normative foundation:** *Foundations of Evidence-Governed Computation*, Paper VI, Version 2.0  
> **License:** Documentation/specification text is governed by the repository license.

The **Evidence-Governed Computation Web Specifications** are implementation-neutral standards-track documents derived from the normative architecture of Evidence-Governed Computation™ (EGC) and profiled for software interfaces, APIs, generated narratives, alerts, reports, and other computational egress surfaces.

They are distinct from **SubstrateX EGC Web™**, which is the reference SDK and implementation. A conforming implementation does not need to use the SubstrateX SDK, React, Vue, TypeScript, or any particular deployment topology.

> **Core law:** No authoritative output may exceed the authority of its evidence.

## Publication set

| Identifier | Document | Purpose |
| --- | --- | --- |
| `EGC-CORE-0.1` | [Core Model Specification](./EGC-CORE-0.1.md) | Constitutional architecture and invariants |
| `EGC-EVIDENCE-0.1` | [Evidence Object & Authority Standard](./EGC-EVIDENCE-0.1.md) | Portable evidence objects and support/authority semantics |
| `EGC-CLAIM-0.1` | [Claim Contract Standard](./EGC-CLAIM-0.1.md) | Machine-readable admissibility contracts |
| `EGC-ABSENCE-0.1` | [Missingness & Absence Semantics](./EGC-ABSENCE-0.1.md) | Typed absence, refusal, and non-substitution rules |
| `EGC-CONFORMANCE-0.1` | [Conformance Standard](./EGC-CONFORMANCE-0.1.md) | Conformance profiles, tests, and violation codes |
| `EGC-UI-0.1` | [Evidence-Bound UI Standard](./EGC-UI-0.1.md) | Surface binding and egress closure for interfaces |
| `EGC-JSON-0.1` | [Interchange Format](./EGC-JSON-0.1.md) | Framework-neutral JSON serialization |

Machine-readable schemas are in [`schemas/`](./schemas/). Canonical examples and conformance fixtures are in [`examples/`](./examples/) and [`fixtures/`](./fixtures/).

## Normative language

The key words **MUST**, **MUST NOT**, **REQUIRED**, **SHOULD**, **SHOULD NOT**, and **MAY** are to be interpreted as normative requirements within these standards-track drafts.

## Scope boundary

EGC conformance establishes an inspectable **claim-to-evidence authority path**. It does not establish factual truth, legal validity, scientific construct validity, safety, security, authenticity of every upstream event, or institutional certification unless those authorities are separately established.

## Interoperability posture

EGC is designed to interoperate with—not replace—existing infrastructure. Implementations MAY map lineage to W3C PROV, validate documents with JSON Schema, expose semantic identifiers through JSON-LD, bind source references to OpenTelemetry traces/spans/events, or incorporate attestation/content-integrity systems. Such integrations do not automatically elevate claim authority.
