# EGC Missingness & Absence Semantics — `EGC-ABSENCE-0.1`

> **Status:** Standards Track Draft 0.1  
> **Publisher:** SubstrateX®  
> **Originator:** Arjay Asadi  
> **Date:** October 2026  
> **Normative foundation:** *Foundations of Evidence-Governed Computation*, Paper VI, Version 2.0  
> **License:** Documentation/specification text is governed by the repository license.

## 1. Principle

> **A value is not an absence state, and an absence state is not a value.**

Formally, EGC implementations MUST preserve the distinction:

```text
0 ≠ false ≠ "" ≠ absent ≠ not_observed ≠ not_supplied
  ≠ unavailable ≠ not_computable ≠ unsupported ≠ withheld
```

## 2. Required semantic states

| State | Meaning | MUST NOT be silently rendered as |
| --- | --- | --- |
| `not_observed` | The relevant phenomenon was not observed in the available evidence under stated conditions | `false`, `did not occur`, `0` |
| `not_supplied` | Required source/context was not provided | `not_observed`, `0`, `normal` |
| `not_eligible` | Material exists but fails declared eligibility/qualification | `unsupported` without reason, `available` |
| `not_computable` | Required evidence/method conditions are absent | estimated/substituted value |
| `below_detection_limit` | Measurement process cannot resolve below declared threshold | `0` unless method defines that equivalence |
| `withheld` | Available/computable but not authorized for current audience/purpose | `missing`, `not_computable` |
| `unavailable` | Required object cannot be accessed/obtained under current conditions | `not_supplied` unless that is the actual reason |
| `conflicting` | Evidence contains unresolved contradictory states | arbitrary winner/normalization |
| `partial` | Coverage exists but is incomplete | complete evidence |
| `unsupported` | A requested proposition lacks a sufficient admissibility basis | `false` |

## 3. Zero, false, and empty values

- `0` is a measurement/value when supplied by an eligible method.
- `false` is a boolean value when supplied by an eligible method/source.
- `""` MAY be a valid string value depending on schema.

They MUST NOT be used as generic placeholders for evidence absence.

## 4. Refusal is a valid result

When evidence does not authorize a requested claim, refusal/non-admission is correct execution of the claim boundary. Generated systems MUST NOT complete an evidentiary gap merely to provide an answer.

## 5. Missingness propagation

A claim or projection that depends on an absence state MUST propagate the relevant state or a contract-defined consequence. It MUST NOT silently erase the absence during aggregation, summarization, visualization, or export.

## 6. Scope-sensitive absence

`not_observed` MUST be scoped to the evidence actually examined. A conforming rendering should prefer language such as:

> Not observed in the available record.

rather than:

> Did not occur.

unless the stronger proposition is independently admissible.

## 7. Conformance tests

At minimum, implementations MUST verify:

1. `0` remains distinguishable from `not_supplied`;
2. `false` remains distinguishable from `not_observed`;
3. removal of a required input produces a typed absence state rather than a computed substitute;
4. withheld material remains distinguishable from missing material;
5. exports preserve absence semantics;
6. UI components do not convert absence into normal/negative state through default rendering behavior.
