// introductionController.js
// =========================
// controller for 'introduction' view

angular.module('pyrite')
    .controller('introductionController', ['$scope', 'appConfig', 'dbService', 'cookieService',
    function($scope, appConfig, dbService, cookieService) {
        $scope.field2Visible = false;
        $scope.field3Visible = false;
        $scope.selectedOther1 = false;
        $scope.selectedOther2 = false;
        $scope.selectedOther3 = false;

        //set up page values:
        //birth years
        $scope.years = new Array();
        $scope.d = new Date();
        $scope.thisYear = $scope.d.getFullYear();
        $scope.years.push({val: 'Select a birth year...', disabled: true });
        for (i = $scope.thisYear - 18; i >= $scope.thisYear - 100; i--) {
            $scope.years.push({val: i});
        }
        $scope.selectBirthYear = $scope.years[0];

        //fields of study
        $scope.fields = [
            { val: 'Select a field...', disabled: true },
            { val: 'Arts & Sciences' },
            { val: 'Built Environments' },
            { val: 'Business' },
            { val: 'Dentistry' },
            { val: 'Education' },
            { val: 'Engineering' },
            { val: 'Environment' },
            { val: 'The Information School' },
            { val: 'Law' },
            { val: 'Medicine' },
            { val: 'Nursing' },
            { val: 'Ocean & Fishery Science' },
            { val: 'Pharmacy' },
            { val: 'Public Affairs' },
            { val: 'Public Health' },
            { val: 'ROTC' },
            { val: 'Social Work' },
            { val: 'Other:' }
        ];
        $scope.selectField1 = $scope.fields[0];
        $scope.selectField2 = $scope.fields[0];
        $scope.selectField3 = $scope.fields[0];

        //genders
        $scope.genders = [
            { val: 'Select a gender...', disabled: true },
            { val: 'Male' },
            { val: 'Female' },
            { val: 'Non-Binary' },
            { val: 'Prefer not to respond' }
        ];
        $scope.selectGender = $scope.genders[0];

        // == page function definitions ========================================
        $scope.formValid = function() {
            return ($scope.selectBirthYear != $scope.years[0]
                    && (($scope.selectField1 != $scope.fields[0] && $scope.selectField1.val != 'Other:')
                        || ($scope.selectField1.val == 'Other:' && $scope.otherField1 != undefined))
                    && (!$scope.field2Visible
                        || (($scope.selectField2 != $scope.fields[0] && $scope.selectField2.val != 'Other:')
                            || ($scope.selectField2.val == 'Other:' && $scope.otherField2 != undefined)))
                    && $scope.selectGender != $scope.genders[0]);
        }
        $scope.submitDemographicInfo = function() {
            var demographicInfo = {
                age: ($scope.thisYear - $scope.selectBirthYear.val),
                field1: ($scope.selectedOther1 ? $scope.otherField1 : $scope.selectField1.val),
                field2: ($scope.selectedOther2 ? $scope.otherField2 : $scope.selectField2.val),
                field3: ($scope.selectedOther3 ? $scope.otherField3 : $scope.selectField3.val),
                gender: $scope.selectGender.val,
                dateConsented: $scope.d.toLocaleDateString()
            }
            //handle when fields 2 and 3 haven't been selected
            if (demographicInfo.field2 == 'Select a field...') demographicInfo.field2 = "";
            if (demographicInfo.field3 == 'Select a field...') demographicInfo.field3 = "";

            var subjectID = dbService.registerNewSubject(demographicInfo);
            cookieService.setSubjectID(subjectID);
        }

        $scope.toggleField2 = function(state) {
            $scope.field2Visible = state;
            if (!state) {
                $scope.selectField2 = $scope.fields[0];
                $scope.toggleOther2(false, true);
            }
        };

        $scope.toggleField3 = function(state) {
            $scope.field3Visible = state;
            if (!state) {
                $scope.selectField3 = $scope.fields[0];
                $scope.toggleOther3(false, true);
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
            $scope.toggleOther1($scope.selectField1.val == 'Other:', false);
        };

        $scope.handleOther2 = function() {
            $scope.toggleOther2($scope.selectField2.val == 'Other:', false);
        };

        $scope.handleOther3 = function() {
            $scope.toggleOther3($scope.selectField3.val == 'Other:', false);
        };
    }]);
