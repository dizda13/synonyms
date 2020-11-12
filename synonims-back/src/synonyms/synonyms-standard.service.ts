import { forEach, uniq, without } from "lodash"
import { HashTable } from "../models/hashTable.model";
import { SynonymService } from './interfaces/SynonymService';
import synonymsDao from './synonyms.dao';

export class synonymsStandardService implements SynonymService {
    private wordTable: HashTable<string>;
    private synonymsTable: HashTable<string[]>;

    constructor(
    ) {
        this.wordTable = synonymsDao.getWordTable();
        this.synonymsTable = synonymsDao.getsynonymsTable();
    }

    public getsynonym(
        word: string,
    ): string[] | undefined {
        const synonymsId: string | undefined = this.wordTable.get(word);
        return synonymsId !== undefined ? this.synonymsTable.get(synonymsId) : undefined
    }

    public deletesynonym(
        word: string,
    ): string[] | undefined {
        const synonymsId: string | undefined = this.wordTable.get(word);
        if (synonymsId !== undefined) {
            const synonyms = this.synonymsTable.get(synonymsId);
            const synonymTableWithoutWord = without(synonyms, word);
            if (synonymTableWithoutWord.length === 0) {
                this.synonymsTable.delete(synonymsId);
            } else {
                this.synonymsTable.set(synonymsId, synonymTableWithoutWord);
            }
            this.wordTable.delete(word);

            return this.synonymsTable.get(synonymsId)
        }
        return undefined;
    }

    // m - number of new word
    // n - number of all word 
    public addNewWords(
        words: string[],
    ): string[] | undefined {
        words = uniq(words);

        // memory -
        const synonymsTableIds: string[] = [];
        const newId: string = synonymsDao.getNextId();
        const newWords: string[] = [];
        // time - O(m)
        forEach(words, (word: string) => {
            const synonymsTableId: string | undefined = this.wordTable.get(word);
            if (synonymsTableId !== undefined) {
                synonymsTableIds.push(synonymsTableId);
            } else {
                this.wordTable.set(word, newId);
                newWords.push(word);
            }
        });

        this.synonymsTable.set(newId, newWords);
        this.mergeTables(newId, ...uniq(synonymsTableIds));

        return this.synonymsTable.get(newId);
    }

    private mergeTables(mainTableKey: string, ...otherTableKeys: string[]) {
        forEach(uniq(otherTableKeys), (replaceKey: string) => {
            const othersynonyms = this.synonymsTable.get(replaceKey);
            forEach(othersynonyms, (synWord: string) => {
                this.wordTable.set(synWord, mainTableKey)
            })
            this.synonymsTable.set(mainTableKey, [
                ...othersynonyms as string[],
                ...this.synonymsTable.get(mainTableKey) as string[],
            ])

            this.synonymsTable.delete(replaceKey);
        })
    }
}