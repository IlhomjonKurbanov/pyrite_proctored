angular.module('pyrite')
    .service('dbService', ['$http', function($http) {
        this.registerNewSubject = function(subject) {
            var data = angular.toJson(subject);
            $http.post('/api/subject/register-new', data)
        		.then(function(data, status, headers, config) {
                    //success
        			alert("success in dbService");
        		}, function(data, status, headers, config) {
                    //failure
                	alert( "failure message: " + JSON.stringify({data: data}));
                });
        }
    }]);
