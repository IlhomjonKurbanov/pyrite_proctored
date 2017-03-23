angular.module('pyrite')
    .controller('startController', ['$scope', '$animateProvider' 'appConfig',
    function($scope, $animateProvider, appConfig) {
        //setup page variables
        $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
        $scope.goToConsent = appConfig.REQUIRE_CONSENT;
    }]);
