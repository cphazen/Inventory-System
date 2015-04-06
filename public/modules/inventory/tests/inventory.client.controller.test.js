'use strict';

(function() {
	// Inventory Controller Spec
	describe('InventoryController', function() {
		// Initialize global variables
		var InventoryController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Inventory controller.
			InventoryController = $controller('InventoryController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one partType object fetched from XHR', inject(function(Inventory) {
			// Create sample partType using the Inventory service
			var samplePart = new Inventory({
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
			});

			// Create a sample inventory array that includes the new partType
			var sampleInventory = [samplePart];

			// Set GET response
			$httpBackend.expectGET('inventory').respond(sampleInventory);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.inventory).toEqualData(sampleInventory);
		}));
		
		it('$scope.findOne() should create an array with one partType object fetched from XHR using a partId URL parameter', inject(function(Inventory) {
			// Define a sample partType object
			var samplePart = new Inventory({
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
			});

			// Set the URL parameter
			$stateParams.partId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/inventory\/([0-9a-fA-F]{24})$/).respond(samplePart);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.partType).toEqualData(samplePart);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Inventory) {
			// Create a sample partType object
			var samplePartPostData = new Inventory({
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
			});

			// Create a sample partType response
			var samplePartResponse = new Inventory({
				_id: '525cf20451979dea2c000001',
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
			});

			// Fixture mock form input values
            scope.category = 'Sample Category';
            scope.partName = 'Sample Name';
            scope.vendor = 'Sample Vendor';
            scope.vndrPartNmbr = '123';
            scope.manufacturer = 'Sample Manufacturer';
            scope.mnfPartNmbr = '456';
            scope.price = '12';
            scope.GX5_amount = '1';
            scope.GX35_amount = '2';
            scope.quantity = '3';

			// Set POST response
			$httpBackend.expectPOST('inventory', samplePartPostData).respond(samplePartResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.category).toEqual('');
			expect(scope.partName).toEqual('');
            expect(scope.vendor).toEqual('');
            expect(scope.vndrPartNmbr).toEqual('');
            expect(scope.manufacturer).toEqual('');
            expect(scope.mnfPartNmbr).toEqual('');
            expect(scope.price).toEqual('');
            expect(scope.GX5_amount).toEqual('');
            expect(scope.GX35_amount).toEqual('');
            expect(scope.quantity).toEqual('');

			// Test URL redirection after the partType was created
			expect($location.path()).toBe('/inventory');
		}));

		it('$scope.update() should update a valid partType', inject(function(Inventory) {
			// Define a sample partType put data
			var samplePartPutData = new Inventory({
				_id: '525cf20451979dea2c000001',
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
			});

			// Mock partType in scope
			scope.partType = samplePartPutData;

			// Set PUT response
			$httpBackend.expectPUT(/inventory\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/inventory');
		}));

		it('$scope.remove() should send a DELETE request with a valid partId and remove the partType from the scope', inject(function(Inventory) {
			// Create new partType object
			var samplePart = new Inventory({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new inventory array and include the partType
			scope.inventory = [samplePart];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/inventory\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePart);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.inventory.length).toBe(0);
		}));
		
		it('$scope.updateQuantity() should increment the quantity of an item', inject(function(Inventory) {
			// Create new partType object
			var samplePart = new Inventory({
				_id: '525a8422f6d0f87f0e407a33',
				quantity: 0
			});

			// Create new inventory array and include the partType
			scope.inventory = [samplePart];

			// Run controller functionality
			scope.updateQuantity(samplePart, 1);

			// Test array after successful update
			expect(samplePart.quantity).toBe(1);
		}));
		
		it('$scope.updateQuantity() should decrement the quantity of an item', inject(function(Inventory) {
			// Create new partType object
			var samplePart = new Inventory({
				_id: '525a8422f6d0f87f0e407a33',
				quantity: 3
			});

			// Create new inventory array and include the partType
			scope.inventory = [samplePart];

			// Run controller functionality
			scope.updateQuantity(samplePart, 1);

			// Test array after successful update
			expect(samplePart.quantity).toBe(1);
		}));
	});
}());
