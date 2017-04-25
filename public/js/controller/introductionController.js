// introductionController.js
// =========================
// controller for 'introduction' view

angular.module('pyrite')
    .controller('introductionController', ['$scope', '$rootScope', 'appConfig', 'demographicValues',
                                           'dbService', 'cookieService', 'articleService',
    function($scope, $rootScope, appConfig, demographicValues, dbService, cookieService, articleService) {
        // == set up page values ===============================================

        //element visibility
        $scope.field2Visible = false;
        $scope.field3Visible = false;
        $scope.selectedOther1 = false;
        $scope.selectedOther2 = false;
        $scope.selectedOther3 = false;

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
        $scope.fields = demographicValues.fields;
        $scope.selectField1 = $scope.fields[0];
        $scope.selectField2 = $scope.fields[0];
        $scope.selectField3 = $scope.fields[0];

        //genders
        $scope.genders = demographicValues.genders;
        $scope.selectGender = $scope.genders[0];

        // == page function definitions ========================================

        //validate form for completeness: birth year, field, and gender form elements
        //must have a non-default value; if additional fields have been requested,
        //those elements must have a non-defualt value; if any of the field form
        //elements are set to 'Other', the respective 'other' text input field
        //must be populated
        $scope.formValid = function() {
            return ($scope.selectBirthYear != $scope.years[0]
                    && (($scope.selectField1 != $scope.fields[0] && $scope.selectField1.val != 'Other:')
                        || ($scope.selectField1.val == 'Other:' && $scope.otherField1 != undefined))
                    && (!$scope.field2Visible
                        || (($scope.selectField2 != $scope.fields[0] && $scope.selectField2.val != 'Other:')
                            || ($scope.selectField2.val == 'Other:' && $scope.otherField2 != undefined)))
                    && (!$scope.field3Visible
                        || (($scope.selectField3 != $scope.fields[0] && $scope.selectField3.val != 'Other:')
                            || ($scope.selectField3.val == 'Other:' && $scope.otherField3 != undefined)))
                    && $scope.selectGender != $scope.genders[0]);
        };

        //processes demographic info and sends it to DB, stores returned SubjectID as a cookie
        $scope.submitDemographicInfo = function() {
            var newArticleOrder = articleService.getNewArticleOrder();
            var demographicInfo = {
                articleOrder: newArticleOrder.toString(),
                age: ($scope.thisYear - $scope.selectBirthYear.val),
                field1: ($scope.selectedOther1 ? $scope.otherField1 : $scope.selectField1.val),
                field2: ($scope.selectedOther2 ? $scope.otherField2 : $scope.selectField2.val),
                field3: ($scope.selectedOther3 ? $scope.otherField3 : $scope.selectField3.val),
                gender: $scope.selectGender.val,
                dateConsented: $scope.d.toLocaleDateString()
            }
            //store articleOrder, in rootScope for quick lookup and in cookies as backup
            $rootScope.articleOrder = newArticleOrder;
            cookieService.setArticleOrder(newArticleOrder);

            //handle when fields 2 and 3 haven't been selected
            if (demographicInfo.field2 == 'Select a field...') demographicInfo.field2 = "";
            if (demographicInfo.field3 == 'Select a field...') demographicInfo.field3 = "";

            var subjectID_promise = dbService.registerNewSubject(demographicInfo);
            subjectID_promise.then(function(subjectID) {
                cookieService.setSubjectID(subjectID);
            });
        };

        //toggle visibility of additional 'field' form elements
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

        //toggle visibility 'other' text input field
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

        //make 'other' text input element visible, if 'other' field is selected
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
