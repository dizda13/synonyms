export interface SynonymService {
    getsynonym(word: string): string[] | undefined;
    deletesynonym(word: string): string[] | undefined;
    addNewWords(words: string[]): string[] | undefined;
}