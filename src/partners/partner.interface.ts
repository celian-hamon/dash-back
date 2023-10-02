export interface Partner {
    get(query: string, param: string[][] | null): void;
}