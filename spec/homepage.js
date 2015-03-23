'use strict';

describe('Protractor testing', function() {
	
	beforeEach(function() {
		browser.get('http://localhost:3000/#!/');
	});
	
	describe('Checking correct title', function() {
		// checking the application's title
		it('Checking correct title', function() {
			expect(browser.getTitle()).toEqual('Inventory DEV');
		});		
	});
	
	describe('Checking homepage buttons', function() {
		it('Checking homepage buttons', function () {
			expect(element(by.css('a.btn.btn-primary.btn-md')).isPresent()).toBe(true);
		});		
	});

	describe('Checking the inventory button', function() {
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


	describe('Inventory testing', function() {

		beforeEach(function() {
			browser.get('http://localhost:3000/#!/');
		});
		
		it('Adding an item to the inventory button', function () {
			var invList;
			
			// clicks the inventory button
			element.all(by.css('[class="list-unstyled action-list"]')).get(0).click();
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/inventory').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/inventory');
			});
			
			/*describe('should get count of inventory items', function() {
				it('should get count of inventory items', function() {
					var invList = element.all(by.repeater('partType in inventory | orderBy:partSort:partReverse | filter:partQuery'));
					expect(invList.count()).toEqual(75);
				}); 				
			});*/

			// Move mouse over the create new inventory part
			browser.driver.actions().mouseMove(element(by.css('[ng-switch-when="dropdown"]'))).perform();
				element.all(by.css('[ng-switch-when="dropdown"]')).then(function (elm) {
					elm[0].click();
			});
	
			browser.driver.actions().mouseMove(element(by.css('[href="/#!/inventory/create"]'))).perform();
				element.all(by.css('[href="/#!/inventory/create"]')).then(function (elm) {
					elm[0].click();
			});
			
			// verify that the button was click
			expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/inventory/create');
			
			// fill in information for new item
			browser.driver.actions().mouseMove(element(by.id('category1'))).perform();
				element.all(by.id('category1')).then(function (elm) {
					elm[0].click();
			});
			element(by.model('partName')).sendKeys('this');
			element(by.model('vendor')).sendKeys('is');
			element(by.model('vndrPartNmbr')).sendKeys('is');
			element(by.model('manufacturer')).sendKeys('a');
			element(by.model('mnfPartNmbr')).sendKeys('protractor');
			element(by.model('price')).sendKeys('1');
			element(by.model('quantity')).sendKeys('2');
			element(by.model('GX5_amount')).sendKeys('1');
			
			element.all(by.id('create-event-button')).click();
			
			// once submit button in click it should go back to inventory list
			expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/inventory');
			
			// search for the new item
			element.all(by.css('Search for an item in the inventory')).sendKeys('this');
			element.all(by.id('part-search')).click();
			
			// check to see that is only one item under the search 
		});
	})
})