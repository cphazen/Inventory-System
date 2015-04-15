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
		
		it('Should get a popup when clicking an incomplete kit to complete', function () {
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
			
			// should get a update missing parts popup
			expect(element.all(by.css('[class="modal-title"]')).isDisplayed()).toBeTruthy();
		});
		
		it('Cancel button on missing part popup is enable', function () {
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
			
			// should get a update missing parts popup
			expect(element.all(by.css('[class="modal-title"]')).isDisplayed()).toBeTruthy();
			
			// click cancel button
			browser.driver.actions().mouseMove(element(by.css('[ng-click="cancel()"]'))).perform();
				element.all(by.css('[ng-click="cancel()"]')).then(function (elm) {
					elm[0].click();
				})
				
			// verify that the right button was click
			expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/kits');		
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
			
			browser.driver.sleep(50);

			// should get a update missing parts popup
			expect(element.all(by.css('[class="modal-title"]')).isDisplayed()).toBeTruthy();
			
			browser.driver.sleep(50);

			// so click add all the missing parts
			browser.driver.actions().mouseMove(element(by.css('[ng-click="ok()"]'))).perform();
				element.all(by.css('[ng-click="ok()"]')).then(function (elm) {
					elm[0].click();
				})
		});	
		
		it('Make a kit into a system', function () {
		
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
			
			browser.driver.sleep(50);
			
			// get the first complete kit and submit it be a system
			browser.driver.actions().mouseMove(element(by.css('[ng-click="makeSystem(kit)"]'))).perform();
				element.all(by.css('[ng-click="makeSystem(kit)"]')).then(function (elm) {
					elm[0].click();
			});
		});
	})
})
