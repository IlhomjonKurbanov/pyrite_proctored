angular.module('pyrite')
    .service('cookieService', ['$cookies', function($cookies) {
        this.setSubjectID = function(subjectID) {
            $cookies.put('subjectID', subjectID);
        }

        this.getSubjectID = function() {
            return $cookies.get('subjectID');
        }

        this.setArticleOrder = function(articleOrder) {
            $cookies.putObject('articleOrder', articleOrder);
        }

        this.getArticleOrder = function() {
            return $cookies.getObject('articleOrder');
        }

        this.setProgress = function(progress) {
            $cookies.putObject('progress', progress);
        }

        this.getProgress = function() {
            return $cookies.getObject('progress');
        }

        this.getOrigin = function(origin) {
            $cookies.put('origin', origin);
        }

        this.getOrigin = function() {
            return $cookies.get('origin');
        }
    }]);
