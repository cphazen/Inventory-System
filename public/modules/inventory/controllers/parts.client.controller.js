'use strict';

angular.module('parts').controller('PartsController', ['$scope', '$modalInstance', 'Parts', 'partType',
    function($scope, $modalInstance, Parts, partType) {

        $scope.serialNmbrs = [];

        var p = Parts.query(
            function (data) {
                var theseParts = [];
                var l = data.length;
                for (var i = 0; i < l; i++) {
                    if (data[i].Type === partType._id) { theseParts.push(data[i].serialNmbr); }
                }
                $scope.serialNmbrs = theseParts;
            }
        );

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
