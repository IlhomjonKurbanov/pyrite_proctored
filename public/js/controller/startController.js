// startController.js
// ==================
// controller for 'start' view

angular.module('pyrite')
    .controller('startController', ['$scope', 'appConfig', '$cookies',
    function($scope, appConfig, $cookies) {
        //setup page variables
        $scope.goToConsent = appConfig.REQUIRE_CONSENT;
    }]);
