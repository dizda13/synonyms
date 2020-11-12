import { expect } from 'chai';
import { createSandbox, SinonSandbox } from 'sinon';
import { SynonymService } from '../../src/synonyms/interfaces/SynonymService';
import { synonymsFunService } from "../../src/synonyms/synonyms-fun.service";

describe("synonyms", () => {
    let synonymsService: SynonymService;
    let sinonSandbox: SinonSandbox;

    describe("On empty table", () => {
        beforeEach(() => {
            sinonSandbox = createSandbox();
            synonymsService = new synonymsFunService();
        })

        it("should get undefined result", () => {
            synonymsService.addNewWords([]);
            const result = synonymsService.getsynonym("test");
            expect(result).to.be.undefined
        });

        it("should add one synonym", () => {
            synonymsService.addNewWords(["test"]);
            const result = synonymsService.getsynonym("test")
            expect(result).to.be.eql(["test"]);
        });

        it("should add list of synonyms", () => {
            synonymsService.addNewWords(["test1", "test2", "test3", "test4"]);
            const result = synonymsService.getsynonym("test1") as string[];
            expect(result.sort()).to.be.eql(["test1", "test2", "test3", "test4"]);
        });

        it("should add three different synonyms", () => {
            synonymsService.addNewWords(["test1"]);
            synonymsService.addNewWords(["test2"]);
            synonymsService.addNewWords(["test3"]);
            const result1 = synonymsService.getsynonym("test1");
            expect(result1).to.be.eql(["test1"]);
            const result2 = synonymsService.getsynonym("test2");
            expect(result2).to.be.eql(["test2"]);
            const result3 = synonymsService.getsynonym("test3");
            expect(result3).to.be.eql(["test3"]);
        });

        it("should merge two tables", () => {
            synonymsService.addNewWords(["test1"]);
            synonymsService.addNewWords(["test2"]);
            synonymsService.addNewWords(["test1", "test2"]);
            const result1 = synonymsService.getsynonym("test1");
            expect(result1).to.be.eql(["test1", "test2"]);
            const result2 = synonymsService.getsynonym("test2");
            expect(result2).to.be.eql(["test2", "test1"]);
        });

        it("should merge two tables with multiple synonyms", () => {
            synonymsService.addNewWords(["test1", "test2"]);
            synonymsService.addNewWords(["test3", "test4"]);
            synonymsService.addNewWords(["test1", "test4"]);

            const result1 = synonymsService.getsynonym("test1") as string[];
            expect(result1.sort()).to.be.eql(['test1', 'test2', 'test3', 'test4']);

            const result2 = synonymsService.getsynonym("test2") as string[];
            expect(result2.sort()).to.be.eql(['test1', 'test2', 'test3', 'test4']);

            const result3 = synonymsService.getsynonym("test3") as string[];
            expect(result3.sort()).to.be.eql(['test1', 'test2', 'test3', 'test4']);

            const result4 = synonymsService.getsynonym("test4") as string[];
            expect(result4.sort()).to.be.eql(['test1', 'test2', 'test3', 'test4']);
        });

        it("should merge new table with old", () => {
            synonymsService.addNewWords(["test1", "test2"]);
            synonymsService.addNewWords(["test2", "test3"]);

            const result1 = synonymsService.getsynonym("test1") as string[];
            expect(result1.sort()).to.be.eql(['test1', 'test2', 'test3']);

            const result2 = synonymsService.getsynonym("test2") as string[];
            expect(result2.sort()).to.be.eql(['test1', 'test2', 'test3']);

            const result3 = synonymsService.getsynonym("test3") as string[];
            expect(result3.sort()).to.be.eql(['test1', 'test2', 'test3']);
        });

        it("should merge new table with two old ones", () => {
            synonymsService.addNewWords(["test1", "test2"]);
            synonymsService.addNewWords(["test3", "test4"]);
            synonymsService.addNewWords(["test5", "test1", "test3"]);

            const result1 = synonymsService.getsynonym("test1") as string[];
            expect(result1.sort()).to.be.eql(['test1', 'test2', 'test3', 'test4', 'test5']);

            const result2 = synonymsService.getsynonym("test2") as string[];
            expect(result2.sort()).to.be.eql(['test1', 'test2', 'test3', 'test4', 'test5']);

            const result3 = synonymsService.getsynonym("test3") as string[];
            expect(result3.sort()).to.be.eql(['test1', 'test2', 'test3', 'test4', 'test5']);

            const result4 = synonymsService.getsynonym("test4") as string[];
            expect(result4.sort()).to.be.eql(['test1', 'test2', 'test3', 'test4', 'test5']);

            const result5 = synonymsService.getsynonym("test4") as string[];
            expect(result5.sort()).to.be.eql(['test1', 'test2', 'test3', 'test4', 'test5']);
        });
    })
})