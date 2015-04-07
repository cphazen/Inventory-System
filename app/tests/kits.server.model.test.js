'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
    Kit = mongoose.model('Kit'),
    KitType = mongoose.model('KitType');

/**
 * Globals
 */
var kit, kitType;

/**
 * Unit tests
 */

describe('Kits Model Unit Tests:', function() {
    beforeEach(function(done) {
        kit = new Kit({
            serialNmbr: '123',
            kitTypeId: 1
            //missingParts: this.missingParts,
            //isSystem: this.isSystem
        });
        done();
    });

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return kit.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without the kitTypeId', function(done) {
			kit.kitTypeId = '';
			return kit.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without a serial number', function(done) {
			kit.serialNmbr = '';
			return kit.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	describe('Method Missing Parts', function() {
		it('should be able to mark the kit as completed', function(done) {
			kit.missingParts = [];
			return kit.save(function(err, res) {
				should.equal(res.completed, true);
				done();
			});
		});
		it('should be able to be mark the kit as incomplete', function(done) {
			kit.missingParts = [{},{}];
			return kit.save(function(err, res) {
				should.equal(res.completed, false);
				done();
			});
		});
	});

	afterEach(function(done) {
		Kit.remove().exec();
		done();
	});
});
