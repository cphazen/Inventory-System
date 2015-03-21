'use strict';

angular.module('inventory').controller('InventoryController', ['$scope', '$stateParams', '$location', 'Authentication', 'Inventory',
	function($scope, $stateParams, $location, Authentication, Inventory) {
		$scope.authentication = Authentication;


        $scope.create = function() {
            var partType = new Inventory({
                category: this.category,
                partName: this.partName,
                vendor: this.vendor,
                vndrPartNmbr: this.vndrPartNmbr,
                manufacturer: this.manufacturer,
                mnfPartNmbr: this.mnfPartNmbr,
                price: this.price,
                GX5_amount: this.GX5_amount,
                GX35_amount: this.GX35_amount,
                quantity: this.quantity
            });
            //$location.path('inventory');
            partType.$save(function() {
                $location.path('inventory');
                $scope.category = '';
                $scope.partName = '';
                $scope.vendor = '';
                $scope.vndrPartNmbr = '';
                $scope.manufacturer = '';
                $scope.mnfPartNmbr = '';
                $scope.price = '';
                $scope.GX5_amount = '';
                $scope.GX35_amount = '';
                $scope.quantity = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

		$scope.remove = function(partType) {
			if (partType) {
				partType.$remove();

				for (var i in $scope.inventory) {
					if ($scope.inventory[i] === partType) {
						$scope.inventory.splice(i, 1);
					}
				}
			} else {
				$scope.partType.$remove(function() {
					$location.path('inventory');
				});
			}
		};


        $scope.update = function() {
            var partType = $scope.partType;

            partType.$update(function() {
                $location.path('inventory');
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };


		$scope.updateQuantity = function (partType, newVal){
			// only for parts that do NOT use part schema
			partType.quantity = newVal;
			partType.$update(partType, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.inventory = Inventory.query();
		};

		$scope.findOne = function() {
			$scope.partType = Inventory.get({
				partId: $stateParams.partId
			});
		};
	}
]);
