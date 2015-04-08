'use strict';

describe('Protractor testing on the kit view', function() {
	
	beforeEach(function() {
		browser.get('http://localhost:3000/#!/');
	});
	
	describe('Application title', function() {
		// checking the application's title
		it('Checking for the correct title', function() {
			expect(browser.getTitle()).toEqual('Inventory DEV');
		});		
	});

	describe('Kit testing', function() {
		var kit;
		
		beforeEach(function() {
			browser.get('http://localhost:3000/#!/');
			
			// Create a data model to use in test
			kit = {
				serialNmbr: '123456789',
                kitTypeId: '1'
                //missingParts: this.missingParts,
                //isSystem: this.isSystem
			};
		});
		
		it('View the list of complete/uncomplete kit', function () {
		
			// clicks the kit button
			element.all(by.css('[class="btn btn-primary btn-md"]')).get(1).click();
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/kits').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/kits');
			});
			
			// Move mouse over the kit dropdown options
			browser.driver.actions().mouseMove(element(by.css('[ng-switch-when="dropdown"]'))).perform();
				element.all(by.css('[ng-switch-when="dropdown"]')).then(function (elm) {
					elm[2].click();
			});
			
			// Click the create kit option
			browser.driver.actions().mouseMove(element(by.css('[href="/#!/kits"]'))).perform();
				element.all(by.css('[href="/#!/kits"]')).then(function (elm) {
					elm[0].click();
			});
			
			// verify that the right button was click
			expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/kits');
		});
		
		it('Adding GX-5 kit', function () {
		
			// clicks the kit button
			element.all(by.css('[class="btn btn-primary btn-md"]')).get(1).click();
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/kits').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/kits');
			});
			
			// Move mouse over the kit dropdown options
			browser.driver.actions().mouseMove(element(by.css('[ng-switch-when="dropdown"]'))).perform();
				element.all(by.css('[ng-switch-when="dropdown"]')).then(function (elm) {
					elm[2].click();
			});
			
			// Click the create kit option
			browser.driver.actions().mouseMove(element(by.css('[href="/#!/kits/create"]'))).perform();
				element.all(by.css('[href="/#!/kits/create"]')).then(function (elm) {
					elm[0].click();
			});
			
			// verify that the right button was click
			expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/kits/create');
			
			// fill in information for new kit (GX5)
			browser.driver.actions().mouseMove(element(by.id('kitTypeId1'))).perform();
				element.all(by.id('kitTypeId1')).then(function (elm) {
					elm[0].click();
			});
			element(by.id('serialNmbr')).sendKeys('123Test');
			
			element.all(by.id('create-event-button')).click();
			
			// once submit button in click it should go back to kit listing
			expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/kits');
			
		});
		
		it('Adding GX-35 kit', function () {
		
			// clicks the kit button
			element.all(by.css('[class="btn btn-primary btn-md"]')).get(1).click();
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/kits').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/kits');
			});
			
			// Move mouse over the kit dropdown options
			browser.driver.actions().mouseMove(element(by.css('[ng-switch-when="dropdown"]'))).perform();
				element.all(by.css('[ng-switch-when="dropdown"]')).then(function (elm) {
					elm[2].click();
			});
			
			// Click the create kit option
			browser.driver.actions().mouseMove(element(by.css('[href="/#!/kits/create"]'))).perform();
				element.all(by.css('[href="/#!/kits/create"]')).then(function (elm) {
					elm[0].click();
			});
			
			// verify that the right button was click
			expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/kits/create');
			
			// fill in information for new kit (GX35)
			browser.driver.actions().mouseMove(element(by.id('kitTypeId2'))).perform();
				element.all(by.id('kitTypeId2')).then(function (elm) {
					elm[0].click();
			});
			element(by.id('serialNmbr')).sendKeys('GX35Kit');
			
			element.all(by.id('create-event-button')).click();
			
			// once submit button in click it should go back to kit listing
			expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/kits');
			
		});
	
		it('Getting error from missing information in adding a kit', function () {
		
			// clicks the kit button
			element.all(by.css('[class="btn btn-primary btn-md"]')).get(1).click();
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/kits').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/kits');
			});
			
			// Move mouse over the kit dropdown options
			browser.driver.actions().mouseMove(element(by.css('[ng-switch-when="dropdown"]'))).perform();
				element.all(by.css('[ng-switch-when="dropdown"]')).then(function (elm) {
					elm[2].click();
			});
			
			// Click the create kit option
			browser.driver.actions().mouseMove(element(by.css('[href="/#!/kits/create"]'))).perform();
				element.all(by.css('[href="/#!/kits/create"]')).then(function (elm) {
					elm[0].click();
			});
			
			// verify that the right button was click
			expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/kits/create');
			
			// fill in information for new kit (GX5)
			browser.driver.actions().mouseMove(element(by.id('kitTypeId1'))).perform();
				element.all(by.id('kitTypeId1')).then(function (elm) {
					elm[0].click();
			});
			
			element.all(by.id('create-event-button')).click();

			// Should get an error message 
			expect(element(by.css('[data-ng-bind="error"]')).isPresent()).toBe(true);
			
			// verify that view did not change
			expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/kits/create');
		});
		
		it('Change an incomplete kit to complete', function () {
			// clicks the kit button
			element.all(by.css('[class="btn btn-primary btn-md"]')).get(1).click();
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/kits').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/kits');
			});
			
			// Move mouse over the kit dropdown options
			browser.driver.actions().mouseMove(element(by.css('[ng-switch-when="dropdown"]'))).perform();
				element.all(by.css('[ng-switch-when="dropdown"]')).then(function (elm) {
					elm[2].click();
			});
			
			// Click the create kit option
			browser.driver.actions().mouseMove(element(by.css('[href="/#!/kits"]'))).perform();
				element.all(by.css('[href="/#!/kits"]')).then(function (elm) {
					elm[0].click();
			});
			
			// verify that the right button was click
			expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/kits');
			
			// get the first uncomplete kit and automatically change it to complete
			browser.driver.actions().mouseMove(element(by.css('[ng-click="complete(kit)"]'))).perform();
				element.all(by.css('[ng-click="complete(kit)"]')).then(function (elm) {
					elm[0].click();
			});
		});	
		
		it('Make change a kit to be a system', function () {
		
			// clicks the kit button
			element.all(by.css('[class="btn btn-primary btn-md"]')).get(1).click();
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/kits').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/kits');
			});
			
			// Move mouse over the kit dropdown options
			browser.driver.actions().mouseMove(element(by.css('[ng-switch-when="dropdown"]'))).perform();
				element.all(by.css('[ng-switch-when="dropdown"]')).then(function (elm) {
					elm[2].click();
			});
			
			// Click the create kit option
			browser.driver.actions().mouseMove(element(by.css('[href="/#!/kits"]'))).perform();
				element.all(by.css('[href="/#!/kits"]')).then(function (elm) {
					elm[0].click();
			});
			
			// verify that the right button was click
			expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/kits');
			
			// get the first complete kit and submit it be a system
			browser.driver.actions().mouseMove(element(by.css('[ng-click="makeSystem(kit)"]'))).perform();
				element.all(by.css('[ng-click="makeSystem(kit)"]')).then(function (elm) {
					elm[0].click();
			});
		});
	})
})