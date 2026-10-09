# EGC Web Standards Alignment Note

The standards-track documents in `/standards` operationalize the implementation-neutral architecture in **Arjay Asadi, Foundations of Evidence-Governed Computation, Paper VI, Version 2.0 (2026)** for web/application systems.

## Mapping

| Paper VI construct | Web standards-track location |
| --- | --- |
| Evidence object / evidence authority | `EGC-EVIDENCE-0.1` |
| Typed claim + admissibility relation | `EGC-CLAIM-0.1` |
| Missingness/refusal | `EGC-ABSENCE-0.1` |
| Bounded projection / authority non-creation | `EGC-CORE-0.1` |
| Surface binding / egress closure | `EGC-UI-0.1` |
| Architectural invariants / conformance program | `EGC-CONFORMANCE-0.1` |
| Portable machine-readable objects | `EGC-JSON-0.1` |

## Important semantic distinction

The initial EGC Web SDK v0.1 uses a scalar-like `authority` enumeration (`direct`, `computed`, `derived`, `proxy`, `interpretive`, `experimental`) as an implementation convenience. Paper VI's normative architecture is more precise: those concepts are better treated as **support/material classes**, while authority itself is layered into source, method, claim, presentation, recommendation, and preservation authority.

The standards-track documents adopt the Paper VI distinction. A future SDK revision should migrate the v0.1 `authority` field toward `support_class` plus explicit layered authority/admissibility metadata while maintaining backward compatibility where practical.

This is an intentional standards alignment, not a change to the governing EGC principle.
