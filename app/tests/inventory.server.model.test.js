'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	PartType = mongoose.model('PartType');

/**
 * Globals
 */
var partType;

/**
 * Unit tests
 */

describe('PartType Model Unit Tests:', function() {
    beforeEach(function(done) {
        partType = new PartType({
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
        });
            done();
    });

	describe('Method Save', function() {
		it('should had not new parts yet', function(done) {
			PartType.find({}, function(err, partType) {
				partType.should.have.length(0);
				done();
			});
		});
		
		it('should be able to save without problems', function(done) {
			return partType.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
		
		it('should be able to show an error when try to save without partName', function(done) {
			partType.partName = '';

			return partType.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without gx5_amount or gx_35 amount', function(done) {
			partType.GX5_amount = '';
			partType.GX35_amount = '';

			return partType.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should show an error when try to save without price', function(done) {
			partType.price = '';

			return partType.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) {
		PartType.remove().exec();
		done();
	});
});
