import { HashTable } from '../models/hashTable.model';

class synonymsDao {
    private wordTable: HashTable<string>;
    private synonymsTable: HashTable<string[]>;
    public counterId = 0;

    public constructor() {
        this.wordTable = new HashTable<string>();
        this.synonymsTable = new HashTable<string[]>();
    }

    public getWordTable(): HashTable<string> {
        return this.wordTable;
    }

    public getsynonymsTable(): HashTable<string[]> {
        return this.synonymsTable;
    }

    public getNextId(): string {
        return (this.counterId++).toString();
    }
}

export default new synonymsDao() as synonymsDao;