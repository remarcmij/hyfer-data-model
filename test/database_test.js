'use strict';
const chai = require('chai');
const expect = chai.expect;
const db = require('../src/database');

let connection;

before(done => {
    db.openDatabase()
        .then(() => {
            connection = db.getConnection();
            done();
        })
        .catch(err => {
            throw err;
        });
})

describe('User stories - User', () => {

    it('should get timeline data for a specific group', done => {
        db.getTimelineForGroup(1)
            .then(done)
            .catch(err => done(err));
    });

});