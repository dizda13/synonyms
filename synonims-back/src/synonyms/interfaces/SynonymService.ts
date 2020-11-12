export interface SynonymService {
    getSynonym(word: string): string[] | undefined;
    deleteSynonym(word: string): string[] | undefined;
    addNewWords(words: string[]): string[] | undefined;
}