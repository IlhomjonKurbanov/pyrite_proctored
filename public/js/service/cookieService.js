angular.module('pyrite')
    .service('cookieService', ['$cookies', function($cookies) {
        this.setSubjectID = function(subjectID) {
            $cookies.put('subjectID', subjectID);
        }

        this.getSubjectID = function() {
            return $cookies.get('subjectID');
        }

        this.setSubjectProgress = function(progress) {
            $cookies.putObject('progress', progress);
        }

        this.getSubjectProgress = function() {
            return $cookies.getObject('progress');
        }
    }]);
