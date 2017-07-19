// endController.js
// ================
// controller for 'end' view

angular.module('pyrite')
    .controller('endController', ['$scope', 'cookieService',
        function($scope, cookieService) {
            //setup page variables
            $scope.subjectID = cookieService.getSubjectID() || 'undefined';
        }]);
