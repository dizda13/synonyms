import { expect } from 'chai';
import { SynonymsStandardService } from '../../src/synonyms/synonyms-standard.service';
import { createSandbox, SinonSandbox } from 'sinon';
import synonymsDao from '../../src/synonyms/synonyms.dao';
import { HashTable } from '../../src/models/hashTable.model';
import { SynonymService } from '../../src/synonyms/interfaces/SynonymService';

describe("Synonyms", () => {
    let synonymsService: SynonymService;
    let sinonSandbox: SinonSandbox;

    describe("Creating", () => {
        beforeEach(() => {
            sinonSandbox = createSandbox();
            synonymsDao.getWordTable = () => new HashTable<string>();
            synonymsDao.getsynonymsTable = () => new HashTable<string[]>();
            synonymsService = new SynonymsStandardService();
        })

        it("should get undefined result", () => {
            synonymsService.addNewWords([]);
            const result = synonymsService.getSynonym("test");
            expect(result).to.be.undefined
        });

        it("should add one synonym", () => {
            synonymsService.addNewWords(["test"]);
            const result = synonymsService.getSynonym("test")
            expect(result).to.be.eql(["test"]);
        });

        it("should add list of synonyms", () => {
            synonymsService.addNewWords(["test1", "test2", "test3", "test4"]);
            const result = synonymsService.getSynonym("test1")
            expect(result).to.be.eql(["test1", "test2", "test3", "test4"]);
        });

        it("should add three different synonyms", () => {
            synonymsService.addNewWords(["test1"]);
            synonymsService.addNewWords(["test2"]);
            synonymsService.addNewWords(["test3"]);
            const result1 = synonymsService.getSynonym("test1");
            expect(result1).to.be.eql(["test1"]);
            const result2 = synonymsService.getSynonym("test2");
            expect(result2).to.be.eql(["test2"]);
            const result3 = synonymsService.getSynonym("test3");
            expect(result3).to.be.eql(["test3"]);
        });

        it("should merge two tables", () => {
            synonymsService.addNewWords(["test1"]);
            synonymsService.addNewWords(["test2"]);
            synonymsService.addNewWords(["test1", "test2"]);
            const result1 = synonymsService.getSynonym("test1");
            expect(result1).to.be.eql(["test2", "test1"]);
            const result2 = synonymsService.getSynonym("test2");
            expect(result2).to.be.eql(["test2", "test1"]);
        });

        it("should merge two tables with multiple synonyms", () => {
            synonymsService.addNewWords(["test1", "test2"]);
            synonymsService.addNewWords(["test3", "test4"]);
            synonymsService.addNewWords(["test1", "test4"]);

            const result1 = synonymsService.getSynonym("test1");
            expect(result1).to.be.eql(['test3', 'test4', 'test1', 'test2']);

            const result2 = synonymsService.getSynonym("test2");
            expect(result2).to.be.eql(['test3', 'test4', 'test1', 'test2']);

            const result3 = synonymsService.getSynonym("test3");
            expect(result3).to.be.eql(['test3', 'test4', 'test1', 'test2']);

            const result4 = synonymsService.getSynonym("test4");
            expect(result4).to.be.eql(['test3', 'test4', 'test1', 'test2']);
        });

        it("should merge new table with old", () => {
            synonymsService.addNewWords(["test1", "test2"]);
            synonymsService.addNewWords(["test2", "test3"]);

            const result1 = synonymsService.getSynonym("test1");
            expect(result1).to.be.eql(['test1', 'test2', 'test3']);

            const result2 = synonymsService.getSynonym("test2");
            expect(result2).to.be.eql(['test1', 'test2', 'test3']);

            const result3 = synonymsService.getSynonym("test3");
            expect(result3).to.be.eql(['test1', 'test2', 'test3']);
        });

        it("should merge new table with two old ones", () => {
            synonymsService.addNewWords(["test1", "test2"]);
            synonymsService.addNewWords(["test3", "test4"]);
            synonymsService.addNewWords(["test5", "test1", "test3"]);

            const result1 = synonymsService.getSynonym("test1");
            expect(result1).to.be.eql(['test3', 'test4', 'test1', 'test2', 'test5']);

            const result2 = synonymsService.getSynonym("test2");
            expect(result2).to.be.eql(['test3', 'test4', 'test1', 'test2', 'test5']);

            const result3 = synonymsService.getSynonym("test3");
            expect(result3).to.be.eql(['test3', 'test4', 'test1', 'test2', 'test5']);

            const result4 = synonymsService.getSynonym("test4");
            expect(result4).to.be.eql(['test3', 'test4', 'test1', 'test2', 'test5']);

            const result5 = synonymsService.getSynonym("test4");
            expect(result4).to.be.eql(['test3', 'test4', 'test1', 'test2', 'test5']);
        });
    })

    describe("Deleting", () => {
        beforeEach(() => {
            sinonSandbox = createSandbox();
            synonymsDao.getWordTable = () => new HashTable<string>();
            synonymsDao.getsynonymsTable = () => new HashTable<string[]>();
            synonymsService = new SynonymsStandardService();
        })

        it("shouldn't delete anything", () => {
            synonymsService.addNewWords(["test1"]);
            synonymsService.deleteSynonym("test2");
            const result1 = synonymsService.getSynonym("test1");
            const result2 = synonymsService.getSynonym("test2");
            expect(result1).to.be.eql(["test1"]);
            expect(result2).to.be.undefined;
        });

        it("should delete synonym", () => {
            synonymsService.addNewWords(["test"]);
            const result = synonymsService.deleteSynonym("test")
            expect(result).to.be.undefined;
        });

        it("should add list of synonyms", () => {
            synonymsService.addNewWords(["test1", "test2", "test3", "test4"]);
            const result = synonymsService.deleteSynonym("test1") as string[];
            expect(result.sort()).to.be.eql(["test2", "test3", "test4"]);
        });

        it("should add list of synonyms", () => {
            synonymsService.addNewWords(["test1", "test2", "test3"]);
            synonymsService.addNewWords(["test4", "test5", "test6"]);
            const result1 = synonymsService.deleteSynonym("test1") as string[];
            const result2 = synonymsService.deleteSynonym("test4") as string[];
            expect(result1.sort()).to.be.eql(["test2", "test3"]);
            expect(result2.sort()).to.be.eql(["test5", "test6"]);
        });
    })
})