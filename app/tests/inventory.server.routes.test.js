'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	PartType = mongoose.model('PartType'),
	agent = request.agent(app);

/**
 * Globals
 */
var partType, partTypeExist;

/**
 * PartType routes tests
 */
describe('PartType CRUD tests', function() {
	beforeEach(function(done) {
		// Test data of new item
        partType = {
            category: 'Sample Category',
            partName: 'Sample Name',
            vendor: 'Sample Vendor',
            vndrPartNmbr: '123',
            manufacturer: 'Sample Manufacturer',
            mnfPartNmbr: '456',
            price: '12',
            GX5_amount: '1',
            GX35_amount: '2',
            quantity:'3'
        };
		
		// Test data of pre-existing item
		partTypeExist = {
			id: '5512a7a4f5c98870042b7688',
            category: 'Fasteners and Mounting Hardware',
            partName: 'Zip-tie',
            vendor: 'Digi-Key',
            vndrPartNmbr: 'A112496-ND',
            manufacturer: 'TE Connectivity',
            mnfPartNmbr: 'A77912-000',
            price: '0.11',
            GX5_amount: '6',
            GX35_amount: '7',
			quantity:'3'
		};
		done();
	});

    /* Might need this test once part gets implemented */
	it('should be able to save a partType', function(done) {
		agent.post('/inventory')
			.send(partType)
			.expect(200)
			.end(function(partTypeSaveErr, partTypeSaveRes) {
				// Handle partType save error
				if (partTypeSaveErr) done(partTypeSaveErr);
				// Get a list of partTypes
				agent.get('/inventory')
					.end(function(partTypesGetErr, partTypesGetRes) {
						// Handle partType save error
						if (partTypesGetErr) done(partTypesGetErr);
						// Get partTypes list
						var partTypes = partTypesGetRes.body;
						// Set assertions
						(partTypes[0].category).match('Sample Category');
						(partTypes[0].partName).match('Sample Name');
						// Call the assertion callback
						done();
					});
			});
	});
	
	it('should not be able to save a partType if no name is provided', function(done) {
		// Invalidate partName field
		partType.partName = '';
		
			agent.post('/inventory')
				.send(partType)
				.expect(400)
				.end(function(partTypeSaveErr, partTypeSaveRes) {
					// Set message assertion
					(partTypeSaveRes.body.message).should.match('Part must have a name');
						
					// Handle partType save error
					done(partTypeSaveErr);
				});
	});

	it('should not be able to save a partType if no amount is provided', function(done) {
		// Invalidate partName field
		partType.GX5_amount = '';
		partType.GX35_amount = '';
		
			agent.post('/inventory')
				.send(partType)
				.expect(400)
				.end(function(partTypeSaveErr, partTypeSaveRes) {
					// Set message assertion
					(partTypeSaveRes.body.message).should.match('Part must have an amount');
						
					// Handle partType save error
					done(partTypeSaveErr);
				});
	});

	it('should not be able to save a partType if invalid amount', function(done) {
		// Invalidate partName field
		partType.GX5_amount = 'amount';
		partType.GX35_amount = 'numbers';
		
			agent.post('/inventory')
				.send(partType)
				.expect(400)
				.end(function(partTypeSaveErr, partTypeSaveRes) {
					// Handle partType save error
					done(partTypeSaveErr);
				});
	});

	it('should not be able to save a partType if no price is provided', function(done) {
		// Invalidate partName field
		partType.price = '';
		
			agent.post('/inventory')
				.send(partType)
				.expect(400)
				.end(function(partTypeSaveErr, partTypeSaveRes) {
					// Set message assertion
					(partTypeSaveRes.body.message).should.match('Part must have a price');
					
					// Handle partType save error
					done(partTypeSaveErr);
				});
	});

	it('should not be able to save a partType if no price is provided', function(done) {
		// Invalidate partName field
		partType.price = 'three hundred dollars';
		
				agent.post('/inventory')
					.send(partType)
					.expect(400)
					.end(function(partTypeSaveErr, partTypeSaveRes) {
						// Set message assertion
						
						// Handle partType save error
						done(partTypeSaveErr);
					});
	});

	it('should be able to update a partType', function(done) {
		// Save a new partType
		agent.post('/inventory')
			.send(partType)
			.expect(200)
			.end(function(partTypeSaveErr, partTypeSaveRes) {
				// Handle partType save error
				if (partTypeSaveErr) done(partTypeSaveErr);

				// Update Part Name
				partType.partName = 'WHY YOU GOTTA BE SO MEAN?';

				// Update an existing partType
				agent.put('/inventory/' + partTypeSaveRes.body._id)
					.send(partType)
					.expect(200)
					.end(function(partTypeUpdateErr, partTypeUpdateRes) {
						// Handle partType update error
						if (partTypeUpdateErr) done(partTypeUpdateErr);

						// Set assertions
						(partTypeUpdateRes.body._id).should.equal(partTypeSaveRes.body._id);
						(partTypeUpdateRes.body.partName).should.match('WHY YOU GOTTA BE SO MEAN?');

						// Call the assertion callback
						done();
					});
			});
	});

	it('should not be able to update a partType with missing information', function(done) {
		// Save a new partType
		agent.post('/inventory')
			.send(partType)
			.expect(200)
			.end(function(partTypeSaveErr, partTypeSaveRes) {
				// Handle partType save error
				if (partTypeSaveErr) done(partTypeSaveErr);

				// Update Part Name
				partType.partName = '';

				// Update an existing partType
				agent.put('/inventory/' + partTypeSaveRes.body._id)
					.send(partType)
					.expect(400)
					.end(function(partTypeUpdateErr, partTypeUpdateRes) {
						// Handle partType update error
						done(partTypeUpdateErr);
					});
			});
	});

	it('should not be able to update a partType with invalid information', function(done) {
		// Save a new partType
		agent.post('/inventory')
			.send(partType)
			.expect(200)
			.end(function(partTypeSaveErr, partTypeSaveRes) {
				// Handle partType save error
				if (partTypeSaveErr) done(partTypeSaveErr);

				// Update Part Name
				partType.price = 'a lot of money';

				// Update an existing partType
				agent.put('/inventory/' + partTypeSaveRes.body._id)
					.send(partType)
					.expect(400)
					.end(function(partTypeUpdateErr, partTypeUpdateRes) {
						// Handle partType update error
						done(partTypeUpdateErr);
					});
			});
	});
	
	it('should be able to get a list of partTypes', function(done) {
		// Create new partType model instance
		var partTypeObj = new PartType(partType);

		// Save the partType
		partTypeObj.save(function() {
			// Request partTypes
			request(app).get('/inventory')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});
    
	it('should be able to get a single partType', function(done) {
		// Create new partType model instance
		var partTypeObj = new PartType(partType);

		// Save the partType
		partTypeObj.save(function() {
			request(app).get('/inventory/' + partTypeObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('partName', partType.partName);

					// Call the assertion callback
					done();
				});
		});
	});
	
	it('should return proper error for single partType which doesnt exist', function(done) {
		request(app).get('/inventory/test')
			.end(function(req, res) {
				// Set assertion
				res.body.should.be.an.Object.with.property('message', 'PartType is invalid');

				// Call the assertion callback
				done();
			});
	});

	it('should be able to delete a partType', function(done) {
				agent.post('/inventory')
					.send(partType)
					.expect(200)
					.end(function(partTypeSaveErr, partTypeSaveRes) {
						// Handle partType save error
						if (partTypeSaveErr) done(partTypeSaveErr);

						// Delete an existing partType
						agent.delete('/inventory/' + partTypeSaveRes.body._id)
							.send(partType)
							.expect(200)
							.end(function(partTypeDeleteErr, partTypeDeleteRes) {
								// Handle partType error error
								if (partTypeDeleteErr) done(partTypeDeleteErr);

								// Set assertions
								(partTypeDeleteRes.body._id).should.equal(partTypeSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
	});

	it('should return error for deleting partType which doesnt exist', function(done) {
		agent.delete('/inventory/test')
			.expect(400)
			.end(function(req, res) {

				// Call the assertion callback
				done();
			});
	});

	it('should be able to find a pre-existing partType', function(done) {
		agent.post('/inventory')
			.send(partTypeExist)
			.expect(200)
			.end(function(partTypeSaveErr, partTypeSaveRes) {
				// Handle partType save error
				if (partTypeSaveErr) done(partTypeSaveErr);
				// Get a list of partTypes
				agent.get('/inventory')
					.end(function(partTypesGetErr, partTypesGetRes) {
						// Handle partType save error
						if (partTypesGetErr) done(partTypesGetErr);
						// Get partTypes list
						var partTypes = partTypesGetRes.body;
						// Set assertions
						(partTypes[0].category).match('Fasteners and Mounting Hardware');
						(partTypes[0].partName).match('Zip-tie');
						// Call the assertion callback
						done();
					});
			});
	});
	
	it('should not be able to save an exisiting part type if no name is edited', function(done) {
		// Invalidate partName field
		partTypeExist.partName = '';
		
			agent.post('/inventory')
				.send(partTypeExist)
				.expect(400)
				.end(function(partTypeSaveErr, partTypeSaveRes) {
					// Set message assertion
					(partTypeSaveRes.body.message).should.match('Part must have a name');
						
					// Handle partType save error
					done(partTypeSaveErr);
				});
	});
	
	it('should not be able to save an exisiting part type if no amount is edited', function(done) {
		// Invalidate partName field
		partTypeExist.GX5_amount = '';
		partTypeExist.GX35_amount = '';
		
			agent.post('/inventory')
				.send(partTypeExist)
				.expect(400)
				.end(function(partTypeSaveErr, partTypeSaveRes) {
					// Set message assertion
					(partTypeSaveRes.body.message).should.match('Part must have an amount');
						
					// Handle partType save error
					done(partTypeSaveErr);
				});
	});

	it('should not be able to save an exisiting part type if invalid amount is edited', function(done) {
		// Invalidate partName field
		partTypeExist.GX5_amount = 'amount';
		partTypeExist.GX35_amount = 'numbers';
		
			agent.post('/inventory')
				.send(partTypeExist)
				.expect(400)
				.end(function(partTypeSaveErr, partTypeSaveRes) {
					// Handle partType save error
					done(partTypeSaveErr);
				});
	});
	
	it('should be able to update an exisiting partType', function(done) {
		// Get exisiting partType
		agent.post('/inventory')
			.send(partTypeExist)
			.expect(200)
			.end(function(partTypeSaveErr, partTypeSaveRes) {
				// Handle partType save error
				if (partTypeSaveErr) done(partTypeSaveErr);

				// Update Part Name
				partTypeExist.partName = 'WHY YOU GOTTA BE SO MEAN?';

				// Update an existing partType
				agent.put('/inventory/' + partTypeSaveRes.body._id)
					.send(partTypeExist)
					.expect(200)
					.end(function(partTypeUpdateErr, partTypeUpdateRes) {
						// Handle partType update error
						if (partTypeUpdateErr) done(partTypeUpdateErr);

						// Set assertions
						(partTypeUpdateRes.body._id).should.equal(partTypeSaveRes.body._id);
						(partTypeUpdateRes.body.partName).should.match('WHY YOU GOTTA BE SO MEAN?');

						// Call the assertion callback
						done();
					});
			});
	});
	
	it('should not be able to update an exisiting partType with missing information', function(done) {
		// Get exisiting partType
		agent.post('/inventory')
			.send(partTypeExist)
			.expect(200)
			.end(function(partTypeSaveErr, partTypeSaveRes) {
				// Handle partType save error
				if (partTypeSaveErr) done(partTypeSaveErr);

				// Update Part Name
				partTypeExist.partName = '';

				// Update an existing partType
				agent.put('/inventory/' + partTypeSaveRes.body._id)
					.send(partTypeExist)
					.expect(400)
					.end(function(partTypeUpdateErr, partTypeUpdateRes) {
						// Handle partType update error
						done(partTypeUpdateErr);
					});
			});
	});
	
	it('should not be able to update an exisiting partType with invalid information', function(done) {
		// Get exisiting partType
		agent.post('/inventory')
			.send(partTypeExist)
			.expect(200)
			.end(function(partTypeSaveErr, partTypeSaveRes) {
				// Handle partType save error
				if (partTypeSaveErr) done(partTypeSaveErr);

				// Update Part Name
				partTypeExist.price = '$$$';

				// Update an existing partType
				agent.put('/inventory/' + partTypeSaveRes.body._id)
					.send(partTypeExist)
					.expect(400)
					.end(function(partTypeUpdateErr, partTypeUpdateRes) {
						// Handle partType update error
						done(partTypeUpdateErr);
					});
			});
	});
	
	afterEach(function(done) {
		PartType.remove().exec();
		done();
	});
});

