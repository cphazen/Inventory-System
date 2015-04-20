'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Part = mongoose.model('Parts');

/**
 * Globals
 */
var part;

/**
 * Unit tests
 */
 
describe('Part Model Unit Tests:', function() {
 /*   beforeEach(function(done) {
		// Test data for part in inventory view
        part = new Parts({
            serialNmbr: '123',
            isUsed: false,
			//Type: mongoose.Schema.Types.ObjectId
        });
        done();
    });
	
	describe('Method Save', function() {
		
		it('should be able to run without problems', function(done) {
			return part.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without serialNmbr', function(done) {
			part.serialNmbr = '';

			return part.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});
	
	afterEach(function(done) {
		//part.remove().exec();
		done();
	});*/
});