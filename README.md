# SubstrateX EGC Web — Reference Framework

**Evidence-Governed Computation for evidence-bound user interfaces.**

> **No claim should exceed the authority of its evidence.**

EGC Web is a framework layer that sits above ordinary application state and below the interface. It makes evidence identity, authority, lineage, missingness, and claim contracts first-class runtime objects so a UI cannot silently promote a weaker evidentiary state into a stronger claim.

## Architectural inversion

Traditional UI flow:

```text
source -> application state -> component -> claim
```

EGC Web:

```text
source
  -> evidence formation
  -> evidence authority
  -> claim contract
  -> bounded projection
  -> interface
```

**Evidence governs outward.** The interface may adapt; evidence authority may not.

## Packages

- `@substratex/egc-core` — evidence objects, authority model, claim contracts, evaluation engine, evidence context.
- `@substratex/egc-validator` — invariant and conformance validation with stable EGC error codes.
- `@substratex/egc-devtools` — inspectable claim/evidence graph for developer tooling.
- `@substratex/egc-react` — React binding reference implementation.
- `@substratex/egc-vue` — Vue binding reference implementation.

## Core primitives

1. **Evidence Object** — what evidence exists, where it came from, how it was formed, and what authority it carries.
2. **Claim Contract** — what an interface is permitted to say and which evidence states permit it.
3. **Authority Policy** — promotion/degradation rules and minimum evidence authority.
4. **Evidence-Bound Projection** — the only representation a governed component receives.

## Non-Mutation Law

> A governed component may consume evidence but may never mutate evidence authority.

Evidence is immutable inside the EGC context. Components can request projections, but they cannot promote candidate evidence to confirmed, proxy evidence to observed, or unsupported evidence to derived.

## Missingness is semantic

EGC distinguishes values from evidentiary state. `0`, `false`, and an empty string are valid values. They are not equivalent to:

- `not_observed`
- `not_supplied`
- `not_computable`
- `unsupported`
- `proxy_only`
- `unavailable`

## Quick start

```ts
import {
  createEvidenceContext,
  defineClaim,
  evaluateClaim,
} from "@substratex/egc-core";

const context = createEvidenceContext({
  runId: "run-001",
  evidence: [
    {
      id: "basin_exit",
      authority: "derived",
      status: "candidate",
      value: { frame: 20 },
      source: { kind: "runtime", ref: "frame:20" },
      method: { id: "boundary-detector", version: "1.0.0" },
    },
  ],
});

const claim = defineClaim({
  id: "failure-confirmed",
  label: "Failure Confirmed",
  requires: [
    { evidenceId: "basin_exit", statuses: ["confirmed"] },
    { evidenceId: "observable_failure", statuses: ["observed"] },
  ],
  minimumAuthority: "derived",
  fallback: "not_computable",
});

const result = evaluateClaim(context, claim);
// result.permitted === false
// result.renderState === "not_computable"
```

Run the executable example:

```bash
npm run build
npm run demo
```


## Standards-track specifications

SubstrateX EGC Web™ is the reference SDK. The implementation-neutral **Evidence-Governed Computation Web Specifications** live in [`standards/`](./standards/). Draft 0.1 publishes:

- `EGC-CORE-0.1`
- `EGC-EVIDENCE-0.1`
- `EGC-CLAIM-0.1`
- `EGC-ABSENCE-0.1`
- `EGC-CONFORMANCE-0.1`
- `EGC-UI-0.1`
- `EGC-JSON-0.1`

The standards-track documents are intended to support independent implementations. React and Vue are bindings to the architecture, not definitions of it. See [`docs/STANDARDS-ALIGNMENT.md`](./docs/STANDARDS-ALIGNMENT.md) for the mapping to the normative Evidence-Governed Computation foundation.

## Status

This is a **v0.1 reference implementation** intended to establish the architecture and executable semantics. It is not yet a security boundary by itself and should not be described as preventing malicious code from bypassing the framework. Enforcement becomes stronger as applications route consequential claims exclusively through EGC-governed projections and add build-time linting / CI conformance checks.
