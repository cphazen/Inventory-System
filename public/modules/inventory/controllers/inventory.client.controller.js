'use strict';

angular.module('inventory').controller('InventoryController', ['$scope', '$stateParams', '$location', 'Authentication', 'Inventory',
    function($scope, $stateParams, $location, Authentication, Inventory) {
        $scope.authentication = Authentication;
		
		/*PartType*/
        $scope.create = function() {
			var partType = new Inventory($scope.partType);
			partType.$save(function(response) {
				$location.path('inventory/' + response._id + '/edit');
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

		$scope.update = function(partType) {
            partType.$update(function() {
                $location.path('inventory/' + partType._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

		$scope.updateQuantity = function (partType, newVal){
			// only for parts that do NOT use part schema
            if(!partType.hasSerialNmbr && !partType.hasFirmWare){
				partType.quantity = newVal;
				partType.$update(partType, function (errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			}
			// open modal for those that do not use part schema
			else{
				$location.path('/inventory/add/' + partType._id);
			}
        };

        $scope.find = function() {
            $scope.inventory = Inventory.query();
        };

        $scope.findOne = function() {
            $scope.partType = Inventory.get({
                partId: $stateParams.partId
            });
        };
	
	/*Parts*/
	    $scope.createPart = function() {
			var parts = new InventoryParts($scope.parts);
            partType.$save(function(response) {
                $location.path('inventory_parts/' + response._id);
                $scope.serialNmbr = '';
                $scope.firmWare = '';
                //$scope.type = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.removePart = function(parts) {
            if (parts) {
                parts.$remove();

                for (var i in $scope.inventory_parts) {
                    if ($scope.inventory_parts[i] === parts) {
                        $scope.inventory_parts.splice(i, 1);
                    }
                }
            } else {
                $scope.parts.$remove(function() {
                    $location.path('inventory_parts');
                });
            }
        };

		$scope.updatePart = function(parts) {
            parts.$update(function() {
                $location.path('inventory_parts/' + parts._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.findPart = function() {
            $scope.inventory_parts = InventoryParts.query();
        };

        $scope.findOnePart = function() {
            $scope.parts = InventoryParts.get({
                partId: $stateParams.partId
            });
        };
    }
]);
