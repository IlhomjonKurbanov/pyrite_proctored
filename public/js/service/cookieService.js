angular.module('pyrite')
    .service('cookieService', ['$cookies', function($cookies) {
        this.storeSubjectID = function(subjectID) {
            $cookies.put('subjectID', subjectID);
        }

        this.getSubjectID = function() {
            return $cookies.get('subjectID');
        }

        this.storeSubjectProgress = function(progress) {
            $cookies.putObject('progress', progress);
        }

        this.getSubjectProgress = function() {
            return $cookies.getObject('progress');
        }
    }]);
