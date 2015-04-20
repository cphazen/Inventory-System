'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	agent = request.agent(app),
    Part = mongoose.model('Parts');

/**
 * Globals
 */
var part;

/**
 * Parts routes tests
 */
describe('Parts CRUD tests', function() {
	beforeEach(function(done) {
        part = new Parts({
            serialNmbr: '123',
            isUsed: false,
			Type: mongoose.Schema.Types.ObjectId
        });
        done();
	});
});
