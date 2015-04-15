'use strict';

describe('Protractor testing on the system view', function() {
	
	beforeEach(function() {
		browser.get('http://localhost:3000/#!/');
	});
	
	describe('Homepage title', function() {
		// checking the application's title
		it('Checking for correct title', function() {
			expect(browser.getTitle()).toEqual('Inventory DEV');
		});			
	});
	
	describe('Checking the system button', function() {
		it('Click the System button', function () {
			// clicks the system button
			element.all(by.css('[class="btn btn-primary btn-md"]')).get(2).click();
			
			browser.driver.sleep(50);
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/systems').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/systems');
			});
		});	
	});
	
	describe('Header links', function() {
		it('Return to the homepage from system view', function () {
			// clicks the system button
			element.all(by.css('[class="btn btn-primary btn-md"]')).get(2).click();
			
			browser.driver.sleep(50);
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/systems').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/systems');
			});
			
			// click the homepage 
			browser.driver.actions().mouseMove(element(by.css('[href="/#!/"]'))).perform();
				element.all(by.css('[href="/#!/"]')).then(function (elm) {
					elm[0].click();
			});
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/');
			});
		});

		it('Switch from system to kits views', function () {
			// clicks the system button
			element.all(by.css('[class="btn btn-primary btn-md"]')).get(2).click();
			
			browser.driver.sleep(50);
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/systems').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/systems');
			});
			
			// Move mouse over the kits header part
			browser.driver.actions().mouseMove(element(by.css('[ng-switch-when="dropdown"]'))).perform();
				element.all(by.css('[ng-switch-when="dropdown"]')).then(function (elm) {
					elm[2].click();
			});
	
			// click the list kits
			browser.driver.actions().mouseMove(element(by.css('[ui-route="/kits"]'))).perform();
				element.all(by.css('[ui-route="/kits"]')).then(function (elm) {
					elm[0].click();
			});
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/kits').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/kits');
			});
		});
	});
})
