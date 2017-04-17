angular.module('pyrite')
    .service('dbService', ['$http', function($http) {
        this.registerNewSubject = function(subject) {
            var data = angular.toJson(subject);
            return $http.post('/api/subject/register-new', data)
                		.then(function success(response) {
                            //success
                			return response.data.subjectID;
                		}, function failure(response) {
                            //failure
                        	alert( "failure message: " + JSON.stringify(response));
                        });
        }
    }]);
