import { HashTable } from '../models/hashTable.model';
import * as _ from "lodash";
import { SynonymService } from './interfaces/SynonymService';

export class synonymsFunService implements SynonymService {
    private allsynonyms: HashTable<string>;

    constructor() {
        this.allsynonyms = new HashTable<string>();
    }

    deletesynonym(word: string): string[] | undefined {
        throw new Error('Method not implemented.');
    }
    public getsynonym(word: any): string[] | undefined {
        const synonyms = _.keys(this.extractChain(word)) 
        return synonyms.length !== 0 ? synonyms : undefined;
    }

    // m - number of words need to be read
    // memory complexity O(2*m) ~ O(m)
    // time complexity O(m)
    public extractChain(word: any): any {
        let pointer = this.allsynonyms.get(word);
        if (!pointer) { return null };
        const wantedsynonyms: any = {};
        let value = word;
        while (pointer !== word) {
            _.set(wantedsynonyms, value, pointer);
            value = pointer;
            pointer = this.allsynonyms.get(pointer as string)
        }
        _.set(wantedsynonyms, value, pointer);
        return  wantedsynonyms;
    }

    public isInActiveChain(word: string, activeChains: any[]): boolean {
        return _.some(activeChains, (ac: any): boolean => _.get(ac, word));
    }

    // 1 - in same chain
    // 2 - two different chains
    // 3 - new synonym
    public addNewWords(newsynonyms: any[]) {
        const activeChains: any[] = [];
        _.forEach(newsynonyms, (syn: any) => {
            const chainStart: string = this.allsynonyms.get(syn) as string;
            if (!chainStart) {
                this.allsynonyms.set(syn, syn);
                activeChains.push({ [syn]: syn });
                return;
            }
            if (!this.isInActiveChain(syn, activeChains)) {
                activeChains.push(this.extractChain(syn));
            };
        });
        const firstKey = _.sample(_.head(activeChains));
        _.forEach(_.tail(activeChains), (chain: any) => {
            const firstPointer = this.allsynonyms.get(firstKey)
            const secondKey = _.sample(chain);
            const secondPointer = this.allsynonyms.get(secondKey);
            this.allsynonyms.set(firstKey, secondPointer as string);
            this.allsynonyms.set(secondKey, firstPointer as string);
        });
        return this.getsynonym(firstKey);
    }
}

