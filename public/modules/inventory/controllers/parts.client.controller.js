'use strict';

angular.module('parts').controller('PartsController', ['$scope', '$modalInstance', 'Parts', 'partType',
    function($scope, $modalInstance, Parts, partType) {

        //console.log(partType._id);

        $scope.create = function(){
            //console.log(partType + ' SERIAL NUMBER: ' + this.serialNmbr);

            var part = new Parts({
                serialNmbr: this.serialNmbr,
                Type: partType._id
            });

            part.$save(function() {
                $scope.serialNmbr = '';
                partType.quantity += 1;
                partType.$update(function(errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            $modalInstance.close();
        };

     $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
     };

}]);
