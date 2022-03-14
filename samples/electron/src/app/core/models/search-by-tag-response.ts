export interface SearchByTagsResponseEntry {
    score: number;
    id: string;
    title: string;
    url: string;
    relations: any[]; // not relevant for this sample
}

export interface SearchByTagResponse {
    count: number;
    offset: number;
    totalCount: number;
    results: SearchByTagsResponseEntry[];
}