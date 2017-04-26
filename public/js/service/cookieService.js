angular.module('pyrite')
    .service('cookieService', ['$cookies', function($cookies) {
        this.registerConsent = function() {
            $cookies.put('hasConsented', true);
        }

        this.hasConsented = function() {
            return ($cookies.get('hasConsented') == undefined) ? false : true;
        }

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
    }]);
