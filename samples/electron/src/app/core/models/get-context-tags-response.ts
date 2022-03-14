export interface MatchingRule {
    description: string;
    score: number;
    tag: string;
    publicationGuid: string;
}

export interface GetContextTagsResponse {
    totalCount: number;
    matchingRules: MatchingRule[];
}