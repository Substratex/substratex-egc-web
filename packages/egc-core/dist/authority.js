import { AUTHORITY_LEVELS } from "./types.js";
const rank = new Map(AUTHORITY_LEVELS.map((authority, index) => [authority, index]));
export function authorityRank(authority) {
    return rank.get(authority) ?? -1;
}
export function authorityAtLeast(actual, required) {
    return authorityRank(actual) >= authorityRank(required);
}
export function weakestAuthority(authorities) {
    if (authorities.length === 0)
        return undefined;
    return authorities.reduce((weakest, current) => authorityRank(current) < authorityRank(weakest) ? current : weakest);
}
//# sourceMappingURL=authority.js.map