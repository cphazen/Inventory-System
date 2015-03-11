'use strict';

describe('Protractor testing', function() {
	
	beforeEach(function() {
		browser.get('http://localhost:3000/#!/');
	});
	
	//first test
	it('Checking correct title', function() {
		expect(browser.getTitle()).toEqual('MEAN.JS - Development Environment');
	});
	
	it('Checking homepage buttons', function () {
        expect(element(by.css('a.btn.btn-primary.btn-md')).isPresent()).toBe(true);
    });
})