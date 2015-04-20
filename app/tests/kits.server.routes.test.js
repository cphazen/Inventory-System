'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	agent = request.agent(app),
    Kit = mongoose.model('Kit'),
    KitType = mongoose.model('KitType');

/**
 * Globals
 */
var kit, kitType;

/**
 * Kit routes tests
 */
describe('Kit CRUD tests', function() {
	beforeEach(function(done) {
        kit = new Kit({
            serialNmbr: '123',
            kitTypeId: 1
            //missingParts: this.missingParts,
            //isSystem: this.isSystem
        });
        done();
	});

/*	it('should be able to save a kit', function(done) {
		agent.post('/kits')
			.send(kit)
			.expect(200)
			.end(function(kitSaveErr, kitSaveRes) {
				// Handle kit save error
				if (kitSaveErr) done(kitSaveErr);
				// Get a list of kits
				agent.get('/kits')
					.end(function(kitsGetErr, kitsGetRes) {
						// Handle kit save error
						if (kitsGetErr) done(kitsGetErr);
						// Get kit list
						var kits = kitsGetRes.body;
						// Set assertions
						(kits[0].serialNmbr).match('123456789');
						(kits[0].kitTypeId).match('1');
						// Call the assertion callback
						done();
					});
					done();
			});
	});

	it('should not be able to save a kit if no serial number is provided', function(done) {
		// Invalidate serial number field
		kit.serialNmbr = '';
			agent.post('/kits')
				.send(kit)
				.expect(400)
				.end(function(kitSaveErr, kitSaveRes) {
					// Set message assertion
					(kitSaveRes.body.message).should.match('Kit must have a serial number');
						
					// Handle kit save error
					done(kitSaveErr);
				});
	});

	it('should not be able to save a kit if no kitTypeId is provided', function(done) {
		// Invalidate kitTypeId field
		kit.kitTypeId = '';
			agent.post('/kits')
				.send(kit)
				.expect(400)
				.end(function(kitSaveErr, kitSaveRes) {
					// Set message assertion
					(kitSaveRes.body.message).should.match('Kit must have a kitTypeId associated with it');
					
					// Handle kit save error
					done(kitSaveErr);
				});
	});
*/
	it('should not be able to save a kit if invalid kitTypeID', function(done) {
		// Invalidate kitTypeId field
		kit.kitTypeID = '3';
			agent.post('/kits/create')
				.send(kit)
				.expect(404)
				.end(function(kitSaveErr, kitSaveRes) {
					// Handle partType save error
					done(kitSaveErr);
				});
	});

	it('should be able to get a list of kits', function(done) {
		// Create new kit model instance
		var kitObj = new Kit(kit);

		// Save the kit
		kitObj.save(function() {
			// Request kits
			request(app).get('/kits')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});
	
	it('should return proper error for single kit which doesnt exist', function(done) {
		request(app).get('/kits/test')
			.end(function(req, res) {
				// Set assertion
				res.body.should.be.an.Object.with.property('message', 'Kit is invalid');

				// Call the assertion callback
				done();
			});
	});

	it('should return error for deleting kit which doesnt exist', function(done) {
		agent.delete('/kits/test')
			.expect(400)
			.end(function(req, res) {
				// Call the assertion callback
				done();
			});
	});
});
