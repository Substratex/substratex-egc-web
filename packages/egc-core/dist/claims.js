import { authorityAtLeast, weakestAuthority } from "./authority.js";
export function defineClaim(contract) {
    if (!contract.id.trim())
        throw new Error("Claim contract id is required.");
    if (!contract.label.trim())
        throw new Error("Claim contract label is required.");
    return Object.freeze({
        ...contract,
        requires: Object.freeze(contract.requires.map((r) => Object.freeze({ ...r }))),
    });
}
function effectiveRequiredAuthority(contract, requirement) {
    return requirement.minimumAuthority ?? contract.minimumAuthority;
}
export function evaluateClaim(context, contract) {
    const support = [];
    const reasons = [];
    for (const requirement of contract.requires) {
        const evidence = context.evidence.get(requirement.evidenceId);
        if (!evidence) {
            if (!requirement.optional) {
                reasons.push({
                    code: "MISSING_EVIDENCE",
                    evidenceId: requirement.evidenceId,
                    message: `Required evidence '${requirement.evidenceId}' is absent.`,
                });
            }
            continue;
        }
        if (!context.policy.allowCrossRunEvidence && evidence.runId !== context.runId) {
            reasons.push({
                code: "RUN_MISMATCH",
                evidenceId: evidence.id,
                message: `Evidence '${evidence.id}' belongs to run '${evidence.runId}', not '${context.runId}'.`,
            });
            continue;
        }
        support.push(evidence);
        if (requirement.statuses && !requirement.statuses.includes(evidence.status)) {
            reasons.push({
                code: "STATUS_MISMATCH",
                evidenceId: evidence.id,
                message: `Evidence '${evidence.id}' has status '${evidence.status}', expected one of: ${requirement.statuses.join(", ")}.`,
            });
        }
        const minimumAuthority = effectiveRequiredAuthority(contract, requirement);
        if (minimumAuthority && !authorityAtLeast(evidence.authority, minimumAuthority)) {
            reasons.push({
                code: "AUTHORITY_INSUFFICIENT",
                evidenceId: evidence.id,
                message: `Evidence '${evidence.id}' authority '${evidence.authority}' is below required '${minimumAuthority}'.`,
            });
        }
        const sourceTrailRequired = requirement.requireSourceTrail ||
            contract.sourceTrail ||
            (context.policy.requireSourceTrailForDirectClaims && minimumAuthority === "direct");
        if (sourceTrailRequired && !evidence.source) {
            reasons.push({
                code: "LINEAGE_UNAVAILABLE",
                evidenceId: evidence.id,
                message: `Evidence '${evidence.id}' has no source binding.`,
            });
        }
    }
    const permitted = reasons.length === 0;
    const authority = weakestAuthority(support.map((item) => item.authority));
    return Object.freeze({
        claimId: contract.id,
        label: contract.label,
        permitted,
        renderState: permitted ? contract.permittedStatus ?? "confirmed" : contract.fallback,
        authority,
        support: Object.freeze([...support]),
        reasons: Object.freeze(permitted
            ? [{ code: "PERMITTED", message: "Claim contract satisfied." }]
            : [...reasons]),
        sourceTrail: Object.freeze(support.flatMap((item) => (item.source ? [item.source] : []))),
    });
}
//# sourceMappingURL=claims.js.map