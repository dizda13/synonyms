import { forEach, uniq, without, first } from "lodash"
import { HashTable } from "../models/hashTable.model";
import { SynonymService } from './interfaces/SynonymService';
import synonymsDao from './synonyms.dao';

export class SynonymsStandardService implements SynonymService {
    private wordTable: HashTable<string>;
    private synonymsTable: HashTable<string[]>;

    constructor(
    ) {
        this.wordTable = synonymsDao.getWordTable();
        this.synonymsTable = synonymsDao.getsynonymsTable();
    }

    // time - O(1)
    // memory - O(1)
    public getSynonym(
        word: string,
    ): string[] | undefined {
        const synonymsId: string | undefined = this.wordTable.get(word);
        return synonymsId !== undefined ? this.synonymsTable.get(synonymsId) : undefined
    }

    public deleteSynonym(
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

            return this.synonymsTable.get(synonymsId) || []
        }
        return undefined;
    }

    // m - number of new word
    // n - number of all word 
    public addNewWords(
        words: string[],
    ): string[] | undefined {
        words = uniq(words);

        // memory - O(n)
        const synonymsTableIds: string[] = [];
        let mainId: string | undefined = this.wordTable.get(first(words) as string);
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

        if (newWords.length > 0 || synonymsTableIds.length > 1) {
            this.synonymsTable.set(newId, newWords);
            mainId = newId;
        }
        if ((newWords.length ? 1 : 0) + synonymsTableIds.length > 1) {
            this.mergeTables(newId, ...uniq(synonymsTableIds));
            mainId = newId;
        }

        return mainId ? this.synonymsTable.get(mainId) : undefined
    }

    private mergeTables(mainTableKey: string, ...otherTableKeys: string[]) {
        // time O(n)
        forEach(uniq(otherTableKeys), (replaceKey: string) => {
            const otherSynonyms = this.synonymsTable.get(replaceKey);
            forEach(otherSynonyms, (synWord: string) => {
                this.wordTable.set(synWord, mainTableKey)
            })
            this.synonymsTable.set(mainTableKey, [
                ...otherSynonyms as string[],
                ...this.synonymsTable.get(mainTableKey) as string[],
            ])

            this.synonymsTable.delete(replaceKey);
        })
    }
}