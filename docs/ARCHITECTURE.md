# EGC Web Architecture v0.1

## Governing law

**No claim should exceed the authority of its evidence.**

## Five layers

### 1. Evidence formation
Adapters create immutable `EvidenceObject` records from source-bound observations, computations, or bounded derivations.

### 2. Evidence context
An `EvidenceContext` binds a run identity to an immutable evidence registry and policy. It is the generalized web-framework analogue of a Current Evidence Run.

### 3. Claim contract
A `ClaimContract` declares the exact evidence requirements, accepted states, minimum authority, and fallback semantics for a consequential interface claim.

### 4. Claim engine
The engine evaluates the claim contract against the evidence context and emits a `ClaimProjection`. The projection contains permission, reason codes, support evidence, source trail, and the bounded render state.

### 5. Evidence-bound UI
Components render projections rather than interpreting raw evidence directly.

## Authority lattice

From weakest to strongest:

`experimental < interpretive < proxy < derived < direct`

The default policy forbids a claim from requiring an authority stronger than the supporting evidence actually possesses.

## Evidence states

Positive/formed states:

- `observed`
- `computed`
- `derived`
- `candidate`
- `confirmed`

Absence/limitation states:

- `not_observed`
- `not_supplied`
- `not_computable`
- `unsupported`
- `proxy_only`
- `unavailable`

## Invariants

- **EGC101 — Missing evidence:** required evidence is absent.
- **EGC102 — Status mismatch:** evidence exists but does not satisfy allowed states.
- **EGC103 — Authority insufficient:** supporting evidence authority is below the claim's minimum authority.
- **EGC104 — Lineage unavailable:** a source trail is required but evidence has no source binding.
- **EGC201 — Authority escalation:** a projection attempts to exceed evidence authority.
- **EGC202 — Candidate promotion:** candidate evidence is rendered as confirmed without a contract permitting confirmation.
- **EGC203 — Unbound claim:** reserved for build-time/linter integration when consequential UI text has no claim contract.
- **EGC301 — Context mismatch:** evidence from another run identity is introduced into the context.

## Threat model

EGC Web is semantic/evidentiary assurance infrastructure, not an authentication, authorization, sandboxing, or cryptographic isolation framework. It can be combined with those controls, but it addresses a different failure class: **interfaces making stronger claims than their evidence supports**.
