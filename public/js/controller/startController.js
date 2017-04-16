// startController.js
// ==================
// controller for 'start' view

angular.module('pyrite')
    .controller('startController', ['$scope', 'appConfig',
    function($scope, appConfig) {
        //setup page variables
        $scope.goToConsent = appConfig.REQUIRE_CONSENT;
    }]);
