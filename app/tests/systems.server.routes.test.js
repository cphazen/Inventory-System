'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	agent = request.agent(app),
    System = mongoose.model('System'),
    Kit = mongoose.model('Kit');

/**
 * Globals
 */
var sys;

/**
 * System routes tests
 */
describe('System CRUD tests', function() {
	beforeEach(function(done) {
		// Create a kit to be turned into a system
		var kit = new Kit({
            serialNmbr: '123',
            kitTypeId: 1,
            missingParts: [],
            isSystem: true
        });
		kit.save(function() {
			System.findOne({kit: kit}, function(err, system) {
				sys = system;
				done();
			});
		});
	});

	it('should be able to get a list of system', function(done) {
		// Create new system model instance
		var systemObj = new System(sys);

		// Save the system
		systemObj.save(function(err) {
			should.not.exist(err);
			// Request systems
			request(app).get('/systems')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});
	
	it('should return proper error for single system which doesnt exist', function(done) {
		request(app).get('/systems/test')
			.end(function(req, res) {
				// Set assertion
				res.body.should.be.an.Object.with.property('message', 'System is invalid');

				// Call the assertion callback
				done();
			});
	});
});
