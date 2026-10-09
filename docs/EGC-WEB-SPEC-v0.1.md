# SubstrateX EGC Web — Specification v0.1

## 1. Purpose

EGC Web is an evidence-governance layer for application interfaces. It does not decide whether a source is objectively true. It governs whether an application claim is authorized by the evidence state available to the application.

## 2. Governing law

> **No claim should exceed the authority of its evidence.**

## 3. Required properties

A conforming implementation MUST:

1. Represent evidence state independently from ordinary application state.
2. Preserve semantic missingness; zero/false/empty MUST NOT be substituted for evidentiary absence.
3. Evaluate consequential claims through explicit claim contracts.
4. Reject or downgrade claims whose required evidence is absent, insufficient, or in an incompatible state.
5. Preserve source lineage when a contract requires a source trail.
6. Prevent governed presentation components from mutating evidence authority.
7. Bind evidence to an evidence context/run identity unless cross-context use is explicitly declared.
8. Expose reason codes for rejected or downgraded claims.

A conforming implementation SHOULD:

1. Make claim projections inspectable in developer tooling.
2. Support framework adapters (React, Vue, etc.).
3. Provide CI/build-time conformance checks for unbound claims.
4. Support signed or hashed evidence contexts where integrity requirements justify it.

## 4. Non-goals

EGC Web is not, by itself:

- an authentication system,
- an authorization system,
- a cryptographic trust root,
- an application sandbox,
- a truth oracle,
- a substitute for domain validation.

Its scope is **claim-to-evidence conformance**.
