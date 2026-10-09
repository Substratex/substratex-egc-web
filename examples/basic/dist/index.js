import { createEvidenceContext, defineClaim, evaluateClaim, } from "../../../packages/egc-core/dist/index.js";
const context = createEvidenceContext({
    runId: "aperture-demo-47",
    evidence: [
        {
            id: "basin_exit",
            authority: "derived",
            status: "candidate",
            value: { frame: 20 },
            source: { kind: "runtime", ref: "frame:20" },
            method: { id: "boundary-detector", version: "1.0.0" },
        },
        {
            id: "observable_failure",
            authority: "direct",
            status: "not_supplied",
            source: { kind: "source", ref: "input:runtime-log" },
            method: { id: "source-qualification", version: "1.0.0" },
        },
    ],
});
const failureConfirmed = defineClaim({
    id: "failure-confirmed",
    label: "Failure Confirmed",
    requires: [
        { evidenceId: "basin_exit", statuses: ["confirmed"], minimumAuthority: "derived" },
        { evidenceId: "observable_failure", statuses: ["observed"], minimumAuthority: "direct", requireSourceTrail: true },
    ],
    minimumAuthority: "derived",
    fallback: "not_computable",
    sourceTrail: true,
});
const result = evaluateClaim(context, failureConfirmed);
console.log("SubstrateX EGC Web — basic example");
console.log(JSON.stringify(result, null, 2));
if (result.permitted) {
    throw new Error("EGC invariant failed: candidate/not-supplied evidence must not confirm failure.");
}
//# sourceMappingURL=index.js.map