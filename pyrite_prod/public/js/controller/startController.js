// startController.js
// ==================
// controller for 'start' view

angular.module('pyrite')
    .controller('startController', ['$scope', '$location', 'appConfig', 'progressService',
        function($scope, $location, appConfig, progressService) {
            //setup page variables
            $scope.start = function() {
                progressService.setStage('instructions');
                $location.path('/instructions');
            }
        }]);
