import { HashTable } from '../models/hashTable.model';
import * as _ from "lodash";
import { SynonymService } from './interfaces/SynonymService';

export class SynonymsFunService implements SynonymService {
    private allSynonyms: HashTable<string>;

    constructor() {
        this.allSynonyms = new HashTable<string>();
    }

    deleteSynonym(word: string): string[] | undefined {
        throw new Error('Method not implemented.');
    }
    public getSynonym(word: any): string[] | undefined {
        const synonyms = _.keys(this.extractChain(word)) 
        return synonyms.length !== 0 ? synonyms : undefined;
    }

    // m - number of words need to be read
    // memory complexity O(2*m) ~ O(m)
    // time complexity O(m)
    public extractChain(word: any): any {
        let pointer = this.allSynonyms.get(word);
        if (!pointer) { return null };
        const wantedSynonyms: any = {};
        let value = word;
        while (pointer !== word) {
            _.set(wantedSynonyms, value, pointer);
            value = pointer;
            pointer = this.allSynonyms.get(pointer as string)
        }
        _.set(wantedSynonyms, value, pointer);
        return  wantedSynonyms;
    }

    public isInActiveChain(word: string, activeChains: any[]): boolean {
        return _.some(activeChains, (ac: any): boolean => _.get(ac, word));
    }

    // 1 - in same chain
    // 2 - two different chains
    // 3 - new synonym
    public addNewWords(newSynonyms: any[]) {
        const activeChains: any[] = [];
        _.forEach(newSynonyms, (syn: any) => {
            const chainStart: string = this.allSynonyms.get(syn) as string;
            if (!chainStart) {
                this.allSynonyms.set(syn, syn);
                activeChains.push({ [syn]: syn });
                return;
            }
            if (!this.isInActiveChain(syn, activeChains)) {
                activeChains.push(this.extractChain(syn));
            };
        });
        const firstKey = _.sample(_.head(activeChains));
        _.forEach(_.tail(activeChains), (chain: any) => {
            const firstPointer = this.allSynonyms.get(firstKey)
            const secondKey = _.sample(chain);
            const secondPointer = this.allSynonyms.get(secondKey);
            this.allSynonyms.set(firstKey, secondPointer as string);
            this.allSynonyms.set(secondKey, firstPointer as string);
        });
        return this.getSynonym(firstKey);
    }
}

