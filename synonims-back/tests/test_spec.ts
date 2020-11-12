import { expect } from 'chai';
import { app } from "../src/config/express";
import { Response } from "superagent";
const request = require('supertest');

describe("Students", () => {
    it("should get all students record", (done) => {
        request(app)
            .get('/')
            .expect(200)
            .end((err: any, res: Response) => {
                if (err)
                    throw err;
                done();
            });
        // expect(true).to.be.eql(true);
    });

})