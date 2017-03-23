angular.module('pyrite')
    .controller('consentController', ['$scope', 'dbService', function($scope, dbService) {
        var d = new Date();
        $scope.today = d.toLocaleDateString();
        $scope.consentSigned = false;
    }]);
