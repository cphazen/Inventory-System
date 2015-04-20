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
		
		it('Check if the create new part button is enable', function() {
			// clicks the inventory button
			element.all(by.css('[class="list-unstyled action-list"]')).get(0).click();
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/inventory').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/inventory');
			});
			
			// Move mouse over the create new button
			browser.driver.actions().mouseMove(element(by.css('[href="/#!/inventory/create"]'))).perform();
				element.all(by.css('[href="/#!/inventory/create"]')).then(function (elm) {
					elm[1].click();
			});
			
			// verify that the button lead to the create view 
			expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/inventory/create');
		})
		
		it('Check inventory list with not added item yet', function() {
			// clicks the inventory button
			element.all(by.css('[class="list-unstyled action-list"]')).get(0).click();
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/inventory').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/inventory');
			});
			
			// verify that there is only 2 part found 
			var invList = element.all(by.repeater('partType in inventory | orderBy:partSort:partReverse | filter:partQuery'));
			expect(invList.count()).toEqual(75);
		})
		
		it('Adding an item to the inventory button', function () {
		
			// clicks the inventory button
			element.all(by.css('[class="list-unstyled action-list"]')).get(0).click();
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/inventory').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/inventory');
			});
			
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
		
		it('Search for new item', function() {
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
		
		it('Search for an exisiting item ', function() {
			// clicks the inventory button
			element.all(by.css('[class="list-unstyled action-list"]')).get(0).click();
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/inventory').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/inventory');
			});
			
			// search for the new item
			element.all(by.model('partQuery')).sendKeys('green');
			element.all(by.id('part-search')).click();
			
			// verify that there is only 2 part found 
			var invList = element.all(by.repeater('partType in inventory | orderBy:partSort:partReverse | filter:partQuery'));
			expect(invList.count()).toEqual(2);
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
		
		it('Remove a part button is enable', function() {
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
			expect(element.all(by.css('[class="glyphicon glyphicon-remove"]')).isDisplayed()).toBeTruthy();
		
			// Note: not yet sure how to click the remove button without the whole protractor test failing 
		})
	})

	describe('Part view testing', function() {
		var partTypeMainComp;
		var partTypeMainCompLinkId = '/#!/inventory/553450e6b789d09008d78ecd/edit';
		
		var partTypeKSun;
		var partTypeKSunLinkId = '/#!/inventory/553450e6b789d09008d78f11/edit';
		
		var partTypeFMH;
		var partTypeFMHLinkId = '/#!/inventory/553450e6b789d09008d78ee1/edit';
		
		var partTypeExtComp;
		var partTypeExtCompLinkId = '/#!/inventory/553450e6b789d09008d78f14/edit';
		
		var partTypeCabWir;
		var partTypeCabWirLinkId = '/#!/inventory/553450e6b789d09008d78efd/edit';
		
		beforeEach(function() {
			browser.get('http://localhost:3000/#!/');
			
			// Existing main components part data model to use in test
			partTypeMainComp = {
				category: 'Main Component',
				partName: 'Custom Dual Bay Enclosure',
				vendor: 'N/A',
				vndrPartNmbr: 'N/A',
				manufacturer: 'AICSYS',
				mnfPartNmbr: 'WMC-202M',
				price: '0',
				GX5_amount: '1',
				GX35_amount: '1',
				quantity:'0'
			};
			
			// Existing k-sun label part data model to use in test
			partTypeKSun = {
				category: 'K-sun Labels',
				partName: 'Ground Label',
				vendor: 'SpinCore',
				vndrPartNmbr: 'N/A',
				manufacturer: 'N/A',
				mnfPartNmbr: 'N/A',
				price: '0',
				GX5_amount: '1',
				GX35_amount: '1',
				quantity:'0'
			};
			
			// Existing fasteners and mounting hardware part data model to use in test
			partTypeFMH = {
				category: 'Fasteners and Mounting Hardware',
				partName: 'DB9 Jack Screws',
				vendor: 'Digi-Key',
				vndrPartNmbr: '7230-5K-ND',
				manufacturer: 'Keystone',
				mnfPartNmbr: '7230-5',
				price: '0.427',
				GX5_amount: '2',
				GX35_amount: '4',
				quantity:'0'
			};
		
			// Existing external components part data model to use in test
			partTypeExtComp = {
				category: 'External Components',
				partName: 'AC Power Cable',
				vendor: 'Digi-Key',
				vndrPartNmbr: 'T1249-C13-NA',
				manufacturer: 'CUI Inc',
				mnfPartNmbr: 'AC-C13-NA',
				price: '9.57',
				GX5_amount: '1',
				GX35_amount: '1',
				quantity:'0'
			};
		
			// Existing cables and wires part data model to use in test
			partTypeCabWir = {
				category: 'Cables and Wires',
				partName: '8" (yellow) 20-gauge wire with fork connector on one end',
				vendor: 'SpinCore',
				vndrPartNmbr: 'CC-2',
				manufacturer: 'A&M Electronics',
				mnfPartNmbr: 'N/A',
				price: '0',
				GX5_amount: '2',
				GX35_amount: '1',
				quantity:'0'
			};
		
		});
		
		it('Check an existing main components part information is correct', function() {
			// clicks the inventory button
			element.all(by.css('[class="list-unstyled action-list"]')).get(0).click();
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/inventory').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/inventory');
			});
			
			// search for the new item
			element.all(by.model('partQuery')).sendKeys(partTypeMainComp.partName);
			element.all(by.id('part-search')).click();
			
			// click the name; which will go to the part's edit view
			//data-ng-href="#!/inventory/553450e6b789d09008d78ecd/edit"
			element.all(by.css('[data-ng-href="#!/inventory/553450e6b789d09008d78ecd/edit"]')).get(0).click();
			
			// verify the link is correct
			expect(browser.getCurrentUrl()).toEqual('http://localhost:3000' + partTypeMainCompLinkId);
			
			// verify that the existing part info is correct
			expect(element(by.name('partName')).getAttribute('value')).toEqual(partTypeMainComp.partName);
			expect(element(by.name('vendor')).getAttribute('value')).toEqual(partTypeMainComp.vendor);
			expect(element(by.name('vndrPartNmbr')).getAttribute('value')).toEqual(partTypeMainComp.vndrPartNmbr);
			expect(element(by.name('manufacturer')).getAttribute('value')).toEqual(partTypeMainComp.manufacturer);
			expect(element(by.name('mnfPartNmbr')).getAttribute('value')).toEqual(partTypeMainComp.mnfPartNmbr);
			expect(element(by.name('price')).getAttribute('value')).toEqual(partTypeMainComp.price);
			expect(element(by.name('quantity')).getAttribute('value')).toEqual(partTypeMainComp.quantity);
			expect(element(by.name('GX5_amount')).getAttribute('value')).toEqual(partTypeMainComp.GX5_amount);
			expect(element(by.name('GX35_amount')).getAttribute('value')).toEqual(partTypeMainComp.GX35_amount);
		})
		
		it('Check an existing k-sun label part information is correct', function() {
			// clicks the inventory button
			element.all(by.css('[class="list-unstyled action-list"]')).get(0).click();
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/inventory').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/inventory');
			});
			
			// search for the new item
			element.all(by.model('partQuery')).sendKeys(partTypeKSun.partName);
			element.all(by.id('part-search')).click();
			
			// click the name; which will go to the part's edit view
			element.all(by.css('[data-ng-href="#!/inventory/553450e6b789d09008d78f11/edit"]')).get(0).click();
			
			// verify the link is correct
			expect(browser.getCurrentUrl()).toEqual('http://localhost:3000' + partTypeKSunLinkId);
			
			// verify that the existing part info is correct
			expect(element(by.name('partName')).getAttribute('value')).toEqual(partTypeKSun.partName);
			expect(element(by.name('vendor')).getAttribute('value')).toEqual(partTypeKSun.vendor);
			expect(element(by.name('vndrPartNmbr')).getAttribute('value')).toEqual(partTypeKSun.vndrPartNmbr);
			expect(element(by.name('manufacturer')).getAttribute('value')).toEqual(partTypeKSun.manufacturer);
			expect(element(by.name('mnfPartNmbr')).getAttribute('value')).toEqual(partTypeKSun.mnfPartNmbr);
			expect(element(by.name('price')).getAttribute('value')).toEqual(partTypeKSun.price);
			expect(element(by.name('quantity')).getAttribute('value')).toEqual(partTypeKSun.quantity);
			expect(element(by.name('GX5_amount')).getAttribute('value')).toEqual(partTypeKSun.GX5_amount);
			expect(element(by.name('GX35_amount')).getAttribute('value')).toEqual(partTypeKSun.GX35_amount);
		})
	
		it('Check an existing fasteners and mounting hardware part information is correct', function() {
			// clicks the inventory button
			element.all(by.css('[class="list-unstyled action-list"]')).get(0).click();
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/inventory').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/inventory');
			});
			
			// search for the new item
			element.all(by.model('partQuery')).sendKeys(partTypeFMH.partName);
			element.all(by.id('part-search')).click();
			
			// click the name; which will go to the part's edit view
			element.all(by.css('[data-ng-href="#!/inventory/553450e6b789d09008d78ee1/edit"]')).get(0).click();
			
			// verify the link is correct
			expect(browser.getCurrentUrl()).toEqual('http://localhost:3000' + partTypeFMHLinkId);
			
			// verify that the existing part info is correct
			expect(element(by.name('partName')).getAttribute('value')).toEqual(partTypeFMH.partName);
			expect(element(by.name('vendor')).getAttribute('value')).toEqual(partTypeFMH.vendor);
			expect(element(by.name('vndrPartNmbr')).getAttribute('value')).toEqual(partTypeFMH.vndrPartNmbr);
			expect(element(by.name('manufacturer')).getAttribute('value')).toEqual(partTypeFMH.manufacturer);
			expect(element(by.name('mnfPartNmbr')).getAttribute('value')).toEqual(partTypeFMH.mnfPartNmbr);
			expect(element(by.name('price')).getAttribute('value')).toEqual(partTypeFMH.price);
			expect(element(by.name('quantity')).getAttribute('value')).toEqual(partTypeFMH.quantity);
			expect(element(by.name('GX5_amount')).getAttribute('value')).toEqual(partTypeFMH.GX5_amount);
			expect(element(by.name('GX35_amount')).getAttribute('value')).toEqual(partTypeFMH.GX35_amount);
		})	
	
		it('Check an existing external components part information is correct', function() {
			// clicks the inventory button
			element.all(by.css('[class="list-unstyled action-list"]')).get(0).click();
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/inventory').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/inventory');
			});
			
			// search for the new item
			element.all(by.model('partQuery')).sendKeys(partTypeExtComp.partName);
			element.all(by.id('part-search')).click();
			
			// click the name; which will go to the part's edit view
			element.all(by.css('[data-ng-href="#!/inventory/553450e6b789d09008d78f14/edit"]')).get(0).click();
			
			// verify the link is correct
			expect(browser.getCurrentUrl()).toEqual('http://localhost:3000' + partTypeExtCompLinkId);
			
			// verify that the existing part info is correct
			expect(element(by.name('partName')).getAttribute('value')).toEqual(partTypeExtComp.partName);
			expect(element(by.name('vendor')).getAttribute('value')).toEqual(partTypeExtComp.vendor);
			expect(element(by.name('vndrPartNmbr')).getAttribute('value')).toEqual(partTypeExtComp.vndrPartNmbr);
			expect(element(by.name('manufacturer')).getAttribute('value')).toEqual(partTypeExtComp.manufacturer);
			expect(element(by.name('mnfPartNmbr')).getAttribute('value')).toEqual(partTypeExtComp.mnfPartNmbr);
			expect(element(by.name('price')).getAttribute('value')).toEqual(partTypeExtComp.price);
			expect(element(by.name('quantity')).getAttribute('value')).toEqual(partTypeExtComp.quantity);
			expect(element(by.name('GX5_amount')).getAttribute('value')).toEqual(partTypeExtComp.GX5_amount);
			expect(element(by.name('GX35_amount')).getAttribute('value')).toEqual(partTypeExtComp.GX35_amount);
		})
	
		it('Check an existing cables and wires part information is correct', function() {
			// clicks the inventory button
			element.all(by.css('[class="list-unstyled action-list"]')).get(0).click();
			
			// verify that the button was click
			browser.get('http://localhost:3000/#!/inventory').then(function() {
				expect(browser.driver.getCurrentUrl()).toMatch('http://localhost:3000/#!/inventory');
			});
			
			// search for the new item
			element.all(by.model('partQuery')).sendKeys(partTypeCabWir.partName);
			element.all(by.id('part-search')).click();
			
			// click the name; which will go to the part's edit view
			element.all(by.css('[data-ng-href="#!/inventory/553450e6b789d09008d78efd/edit"]')).get(0).click();
			
			// verify the link is correct
			expect(browser.getCurrentUrl()).toEqual('http://localhost:3000' + partTypeCabWirLinkId);
			
			// verify that the existing part info is correct
			expect(element(by.name('partName')).getAttribute('value')).toEqual(partTypeCabWir.partName);
			expect(element(by.name('vendor')).getAttribute('value')).toEqual(partTypeCabWir.vendor);
			expect(element(by.name('vndrPartNmbr')).getAttribute('value')).toEqual(partTypeCabWir.vndrPartNmbr);
			expect(element(by.name('manufacturer')).getAttribute('value')).toEqual(partTypeCabWir.manufacturer);
			expect(element(by.name('mnfPartNmbr')).getAttribute('value')).toEqual(partTypeCabWir.mnfPartNmbr);
			expect(element(by.name('price')).getAttribute('value')).toEqual(partTypeCabWir.price);
			expect(element(by.name('quantity')).getAttribute('value')).toEqual(partTypeCabWir.quantity);
			expect(element(by.name('GX5_amount')).getAttribute('value')).toEqual(partTypeCabWir.GX5_amount);
			expect(element(by.name('GX35_amount')).getAttribute('value')).toEqual(partTypeCabWir.GX35_amount);
		})
	})	
})
