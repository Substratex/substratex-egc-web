export function projectEvidence(context, evidenceId) {
    const evidence = context.evidence.get(evidenceId);
    if (!evidence)
        return undefined;
    return Object.freeze({
        id: evidence.id,
        status: evidence.status,
        authority: evidence.authority,
        value: evidence.value,
        sourceBound: Boolean(evidence.source),
        limitations: Object.freeze([...(evidence.limitations ?? [])]),
    });
}
//# sourceMappingURL=projection.js.map