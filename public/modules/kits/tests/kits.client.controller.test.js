'use strict';

(function() {
	// Kits Controller Spec
	describe('KitsController', function() {
		// Initialize global variables
		var KitsController,
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

			// Initialize the Kits controller.
			KitsController = $controller('KitsController', {
				$scope: scope
			});
		}));
		/*
		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Inventory) {
			// Create a sample partType object
			var samplePartPostData = new Kits({
                serialNmbr: '123456789',
                kitTypeId: '1'
                //missingParts: this.missingParts,
                //isSystem: this.isSystem
            });

			// Create a sample partType response
			var samplePartResponse = new Kits({
                serialNmbr: '123456789',
                kitTypeId: '1'
                //missingParts: this.missingParts,
                //isSystem: this.isSystem
            });

			// Fixture mock form input values
            scope.serialNmbr = '123456789';
            scope.kitTypeId = '1';

			// Set POST response
			$httpBackend.expectPOST('kits', samplePartPostData).respond(samplePartResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.serialNmbr).toEqual('');
			expect(scope.kitTypeId).toEqual('');

			// Test URL redirection after the partType was created
			expect($location.path()).toBe('/kits');
		}));
		
		it('$scope.update() should update a valid kit', inject(function(Inventory) {
			// Define a sample partType put data
			var samplePartPutData = new Kits({
                serialNmbr: '123456789',
                kitTypeId: '1'
                //missingParts: this.missingParts,
                //isSystem: this.isSystem
            });

			// Mock partType in scope
			scope.kits = samplePartPutData;

			// Set PUT response
			$httpBackend.expectPUT(/kits\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/kits');
		}));	*/	
	});
}());	
		