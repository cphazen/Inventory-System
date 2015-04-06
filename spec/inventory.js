'use strict';

describe('Protractor testing on the inventory view', function() {
	
	beforeEach(function() {
		browser.get('http://localhost:3000/#!/');
	});
	
	describe('Application title', function() {
		// checking the application's title
		it('Checking for the correct title', function() {
			expect(browser.getTitle()).toEqual('Inventory DEV');
		});		
	});

	describe('Inventory testing', function() {
		var partType;
		
		beforeEach(function() {
			browser.get('http://localhost:3000/#!/');
			
			// Create a data model to use in test
			partType = {
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
			};
		});
		
		it('Adding an item to the inventory button', function () {
		
			// clicks the inventory button
			element.all(by.css('[class="list-unstyled action-list"]')).get(0).click();
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/inventory').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/inventory');
			});
			
			/*describe('should get original count of inventory items', function() {
				it('should get count of inventory items', function() {
					var invList = element.all(by.repeater('partType in inventory | orderBy:partSort:partReverse | filter:partQuery'));
					expect(invList.count()).toEqual(1);
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
			element(by.model('partName')).sendKeys(partType.partName);
			element(by.model('vendor')).sendKeys(partType.vendor);
			element(by.model('vndrPartNmbr')).sendKeys(partType.vndrPartNmbr);
			element(by.model('manufacturer')).sendKeys(partType.manufacturer);
			element(by.model('mnfPartNmbr')).sendKeys(partType.mnfPartNmbr);
			element(by.model('price')).sendKeys(partType.price);
			element(by.model('quantity')).sendKeys(partType.quantity);
			element(by.model('GX5_amount')).sendKeys(partType.GX5_amount);
			element(by.model('GX35_amount')).sendKeys(partType.GX35_amount);
			
			element.all(by.id('create-event-button')).click();
			
			// once submit button in click it should go back to inventory list
			expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/inventory');
			
		});
		
		it('Search for an item ', function() {
			// clicks the inventory button
			element.all(by.css('[class="list-unstyled action-list"]')).get(0).click();
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/inventory').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/inventory');
			});
			
			// search for the new item
			element.all(by.model('partQuery')).sendKeys(partType.partName);
			element.all(by.id('part-search')).click();
			
			// verify that the item is there
			var invList = element.all(by.repeater('partType in inventory | orderBy:partSort:partReverse | filter:partQuery'));
			expect(invList.count()).toEqual(1);
		})
		
		it('Increment and decrement a part', function() {
			// clicks the inventory button
			element.all(by.css('[class="list-unstyled action-list"]')).get(0).click();
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/inventory').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/inventory');
			});
			
			// search for the new item
			element.all(by.model('partQuery')).sendKeys(partType.partName);
			element.all(by.id('part-search')).click();
			
			// increment quantity
			browser.driver.actions().mouseMove(element(by.css('[ng-click="updateQuantity(partType, partType.quantity + 1)"]'))).perform();
			element.all(by.css('[ng-click="updateQuantity(partType, partType.quantity + 1)"]')).then(function (elm) {
				elm[0].click();
				elm[0].click();
				elm[0].click();
				elm[0].click();
			});
			
			// increment quantity
			browser.driver.actions().mouseMove(element(by.css('[ng-click="updateQuantity(partType, partType.quantity + 1)"]'))).perform();
			element.all(by.css('[ng-click="updateQuantity(partType, partType.quantity + 1)"]')).then(function (elm) {
				elm[0].click();
				elm[0].click();
				elm[0].click();
				elm[0].click();
			});
			
			// decrement quantity
			browser.driver.actions().mouseMove(element(by.css('[ng-click="updateQuantity(partType, partType.quantity - 1)"]'))).perform();
			element.all(by.css('[ng-click="updateQuantity(partType, partType.quantity - 1)"]')).then(function (elm) {
				elm[0].click();
				elm[0].click();
				elm[0].click();
				elm[0].click();
			});
		})
		
		it('Edit the price of a part', function() {
			// clicks the inventory button
			element.all(by.css('[class="list-unstyled action-list"]')).get(0).click();
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/inventory').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/inventory');
			});
			
			// search for the new item
			element.all(by.model('partQuery')).sendKeys(partType.partName);
			element.all(by.id('part-search')).click();
			
			// edit the part's information
			browser.driver.actions().mouseMove(element(by.css('[class="glyphicon glyphicon-pencil"]'))).perform();
			element.all(by.css('[class="glyphicon glyphicon-pencil"]')).then(function (elm) {
				elm[0].click();
			});
			
			// change the price
			browser.driver.actions().mouseMove(element(by.css('[name="price"]'))).perform();
			element.all(by.css('[name="price"]')).then(function(elm) {
				elm[0].clear();
				elm[0].sendKeys('10');
			});
			
			// save the changes
			browser.driver.actions().mouseMove(element(by.css('[class="glyphicon glyphicon-floppy-disk"]'))).perform();
			element.all(by.css('[class="glyphicon glyphicon-floppy-disk"]')).then(function (elm) {
				elm[0].click();
			});
		})
		
		it('Remove a part', function() {
			// clicks the inventory button
			element.all(by.css('[class="list-unstyled action-list"]')).get(0).click();
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/inventory').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/inventory');
			});
			
			// search for the new item
			element.all(by.model('partQuery')).sendKeys(partType.partName);
			element.all(by.id('part-search')).click();
			
			// check that remove button is enable
			//expect(element.all(by.css('[class="glyphicon glyphicon-remove"]'))).toBe(true);
		})
	})
})