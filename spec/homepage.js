'use strict';

describe('Protractor testing', function() {
	
	beforeEach(function() {
		browser.get('http://localhost:3000/#!/');
	});
	
	// first test
	it('Checking correct title', function() {
		expect(browser.getTitle()).toEqual('Inventory DEV');
	});
	
	it('Checking homepage buttons', function () {
        expect(element(by.css('a.btn.btn-primary.btn-md')).isPresent()).toBe(true);
    });
	
	it('Click the Inventory button', function () {
		// clicks the 1st element
		element.all( by.css('[class="list-unstyled action-list"]') ).get(0).click();
		//expect(browser.get('http://localhost:3000/#!/inventory')).isPresent().toBe(true);
	});
})