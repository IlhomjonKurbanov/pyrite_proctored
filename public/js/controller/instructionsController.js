// demographicController.js
// ========================
// controller for 'demographic' view

angular.module('pyrite')
    .controller('instructionsController', ['$scope', '$location',
        function($scope, $location) {
            $scope.begin = function() {
                $location.path('/consent')
            }
        }]);
