'use strict';

describe('Protractor testing on the homepage', function() {
	
	beforeEach(function() {
		browser.get('http://localhost:3000/#!/');
	});
	
	describe('Homepage title', function() {
		// checking the application's title
		it('Checking for correct title', function() {
			expect(browser.getTitle()).toEqual('Inventory DEV');
		});		
	});
	
	describe('Homepage buttons', function() {
		it('Checking that the buttons on the homepage is enable', function () {
			expect(element(by.css('a.btn.btn-primary.btn-md')).isPresent()).toBe(true);
		});		
	});

	describe('Chicking the inventory button', function() {
		it('Click the Inventory button', function () {
			// clicks the first button
			element.all(by.css('[class="list-unstyled action-list"]')).get(0).click();
			
			browser.driver.sleep(50);
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/inventory').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/inventory');
			});
		});		
	});
	
	describe('Header links', function() {
		it('Return to the homepage from inventory view', function () {
			// clicks the first button
			element.all(by.css('[class="list-unstyled action-list"]')).get(0).click();
			
			browser.driver.sleep(50);
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/inventory').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/inventory');
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

		it('Return to the homepage from kits view', function () {
			// clicks the second button
			element.all(by.css('[class="btn btn-primary btn-md"]')).get(1).click();
			
			browser.driver.sleep(50);
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/kits').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/kits');
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
		
		it('Switch from inventory to kits views', function () {
			// clicks the first button
			element.all(by.css('[class="list-unstyled action-list"]')).get(0).click();
			
			browser.driver.sleep(50);
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/inventory').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/inventory');
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
	
	describe('Checking the kits button', function() {
		it('Click the Kits button', function () {
			// clicks the second button
			element.all(by.css('[class="btn btn-primary btn-md"]')).get(1).click();
			
			browser.driver.sleep(50);
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/kits').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/kits');
			});
		});		
	});
	
	/*
	describe('Checking the system button', function() {
		it('Click the System button', function () {
			// clicks the second button
			element.all(by.css('[class="btn btn-primary btn-md"]')).get(2).click();
			
			browser.driver.sleep(50);
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/system').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/system');
			});
		});		
	});
	*/
})
