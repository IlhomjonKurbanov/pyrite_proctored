// introductionController.js
// =========================
// controller for 'introduction' view

angular.module('pyrite')
    .controller('introductionController', ['$scope', 'appConfig', 'dbService',
    function($scope, appConfig, dbService) {
        $scope.showField2 = false;
        $scope.showField3 = false;

        //set up page values
        $scope.fields = [
            "Arts & Sciences",
            "Built Environments",
            "Business",
            "Dentistry",
            "Education",
            "Engineering",
            "Environment",
            "The Information School",
            "Law",
            "Medicine",
            "Nursing",
            "Ocean & Fishery Science",
            "Pharmacy",
            "Public Affairs",
            "Public Health",
            "ROTC",
            "Social Work",
            "Other"
        ]

        //birth years, from age 18 to 100
        $scope.years = new Array();
        var d = new Date();
        var thisYear = d.getFullYear();
        for (i = thisYear - 18; i >= thisYear - 100; i--) {
            $scope.years.push(i);
        }

        $scope.addField = function() {
            //add new div below, with additional field
        }
    }]);
