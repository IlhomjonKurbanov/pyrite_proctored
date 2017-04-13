// introductionController.js
// =========================
// controller for 'introduction' view

angular.module('pyrite')
    .controller('introductionController', ['$scope', 'appConfig', 'dbService',
    function($scope, appConfig, dbService) {
        $scope.field2Visible = false;
        $scope.field3Visible = false;
        $scope.selectedOther1 = false;
        //selectedOther = false, etc.

        //set up page values
        $scope.fields = [
            { name: 'Select a field...', disabled: true},
            { name: 'Arts & Sciences' },
            { name: 'Built Environments' },
            { name: 'Business' },
            { name: 'Dentistry' },
            { name: 'Education' },
            { name: 'Engineering' },
            { name: 'Environment' },
            { name: 'The Information School' },
            { name: 'Law' },
            { name: 'Medicine' },
            { name: 'Nursing' },
            { name: 'Ocean & Fishery Science' },
            { name: 'Pharmacy' },
            { name: 'Public Affairs' },
            { name: 'Public Health' },
            { name: 'ROTC' },
            { name: 'Social Work' },
            { name: 'Other:' }
        ];
        $scope.selectField1 = $scope.fields[0];
        $scope.selectField2 = $scope.fields[0];
        $scope.selectField3 = $scope.fields[0];

        //birth years, from age 18 to 100
        $scope.years = new Array();
        var d = new Date();
        var thisYear = d.getFullYear();
        for (i = thisYear - 18; i >= thisYear - 100; i--) {
            $scope.years.push(i);
        }

        $scope.toggleField2 = function(state) {
            $scope.field2Visible = state;
            if (!state) {
                $scope.selectField2 = $scope.fields[0];
            }
        };

        $scope.toggleField3 = function(state) {
            $scope.field3Visible = state;
            if (!state) {
                $scope.selectField3 = $scope.fields[0];
            }
        };

        $scope.toggleOther1 = function(state, canceled) {
            $scope.selectedOther1 = state;
            if (canceled) {
                $scope.selectField1 = $scope.fields[0];
            }
        };

        $scope.toggleOther2 = function(state, canceled) {
            $scope.selectedOther2 = state;
            if (canceled) {
                $scope.selectField2 = $scope.fields[0];
            }
        };

        $scope.toggleOther3 = function(state, canceled) {
            $scope.selectedOther3 = state;
            if (canceled) {
                $scope.selectField3 = $scope.fields[0];
            }
        };

        $scope.handleOther1 = function() {
            $scope.toggleOther1($scope.selectField1.name == 'Other:', false);
        };

        $scope.handleOther2 = function() {
            $scope.toggleOther2($scope.selectField2.name == 'Other:', false);
        };

        $scope.handleOther3 = function() {
            $scope.toggleOther3($scope.selectField3.name == 'Other:', false);
        };
    }]);
