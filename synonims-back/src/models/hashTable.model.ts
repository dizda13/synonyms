import { get, set } from "lodash";

export class HashTable<Value> {
    // In javascript object act as hashTables beneath;
    private table: { [key: string]: Value };

    public constructor() {
        this.table = {}
    }

    public get(key: string): Value | undefined {
        return get(this.table, key);
    }

    public set(key: string, value: Value): void {
        set(this.table,key, value);
    }

    public delete(key: string): void {
        delete this.table[key];
    }
}
