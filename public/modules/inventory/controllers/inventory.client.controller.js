'use strict';

angular.module('inventory').controller('inventoryController', ['$scope', '$stateParams', '$location', 'Inventory', 'Parts', 'PartType',
	function($scope, $stateParams, $location, Inventory, Parts, PartType) {
		//$scope.authentication = Authentication;

		$scope.addPart = function() {
			var part = new Parts({
				title: this.title
			});
			part.$save(function(response) {
				$location.path('parts/' + response._id);

				$scope.title = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.removePart = function(part) {
			if (part) {
				part.$remove();

				for (var i in $scope.parts) {
					if ($scope.parts[i] === part) {
						$scope.parts.splice(i, 1);
					}
				}
			} else {
				$scope.part.$remove(function() {
					$location.path('parts');
				});
			}
		};

		/*create a part type*/
		$scope.createPart = function() {
			var part_type = new PartType({
				Category : this.Category,
				partName : this.partName,
				Vendor : this.Vendor,
				vndrPartNmbr : this.vndrPartNmbr,
				Manufacturer : this.Manufacturer,
				mnfPartNmbr : this.mnfPartNmbr,
				price : parseFloat(this.price),
				amount : parseFloat(this.amount)
			});
			//redirect after saving
			event.$save(function(response){
				$location.path('/inventory/');
			
				//clear the fields
				$scope.partName = '';
				$scope.Vendor = '';
				$scope.vndrPartNmbr = '';
				$scope.Manufacturer = '';
				$scope.mnfPartNmbr = '';
				$scope.price = '';
				$scope.amount = '';
		};

		$scope.editPart = function() {
			//$scope.parts = parts.query();
		};

		$scope.listInventory = function() {
			$scope.part = Parts.get({
				partId: $stateParams.partId
			});
		};
	}
]);
