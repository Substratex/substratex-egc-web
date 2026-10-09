import { strict as assert } from "node:assert";
import { createEvidenceContext, defineClaim, evaluateClaim } from "../../packages/egc-core/dist/index.js";

{
  const context = createEvidenceContext({
    runId: "r1",
    evidence: [{ id: "boundary", status: "candidate", authority: "derived", source: { kind: "runtime", ref: "frame:20" } }],
  });
  const claim = defineClaim({
    id: "boundary-confirmed", label: "Boundary Confirmed",
    requires: [{ evidenceId: "boundary", statuses: ["confirmed"] }], fallback: "unsupported",
  });
  const result = evaluateClaim(context, claim);
  assert.equal(result.permitted, false);
  assert.equal(result.renderState, "unsupported");
}

{
  const context = createEvidenceContext({
    runId: "r2",
    evidence: [{ id: "error_count", status: "observed", authority: "direct", value: 0, source: { kind: "log", ref: "errors" } }],
  });
  const claim = defineClaim({
    id: "error-count-observed", label: "Error Count Observed",
    requires: [{ evidenceId: "error_count", statuses: ["observed"], minimumAuthority: "direct" }], fallback: "not_supplied",
  });
  assert.equal(evaluateClaim(context, claim).permitted, true);
}

{
  const context = createEvidenceContext({
    runId: "r3",
    evidence: [{ id: "metric", status: "derived", authority: "derived", value: 0.7 }],
  });
  const claim = defineClaim({
    id: "metric-claim", label: "Metric Claim",
    requires: [{ evidenceId: "metric", statuses: ["derived"], requireSourceTrail: true }], fallback: "unsupported", sourceTrail: true,
  });
  const result = evaluateClaim(context, claim);
  assert.equal(result.permitted, false);
  assert.ok(result.reasons.some((reason) => reason.code === "LINEAGE_UNAVAILABLE"));
}

assert.throws(() => createEvidenceContext({
  runId: "r4",
  evidence: [{ id: "foreign", runId: "r5", status: "observed", authority: "direct", source: { kind: "log", ref: "x" } }],
}));

console.log("EGC conformance smoke tests passed.");
