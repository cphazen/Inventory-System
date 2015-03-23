'use strict';

describe('Protractor homepage testing', function() {
	
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
	
	it('Click the Inventory button and verify new window url', function () {
		// clicks the first button
		element.all(by.css('[class="list-unstyled action-list"]') ).get(0).click();
		
		// to verify that the button was pressed
		browser.driver.sleep(50);
		
		expect(browser.getCurrentUrl()).toMatch('http://localhost:3000/#!/inventory');//.get('http://localhost:3000/#!/inventory')).toBe(true);
	});
})