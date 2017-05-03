angular.module('pyrite')
    .service('dbService', ['$http', function($http) {
        //register a subject: {articleOrder, age, field1, field2, field3, gender, dateConsented}
        this.registerNewSubject = function(subject) {
            var data = angular.toJson(subject);
            return $http.post('/api/subject/register-new', data)
                		.then(function success(response) {
                            //success
                			return response.data.subjectID;
                		}, function failure(response) {
                            //failure
                        	alert("failure message: " + JSON.stringify(response));
                        });
        }

        //register an email address: {email}
        this.registerPrizeDrawingParticipant = function(email) {
            var data = angular.toJson(email);
            return $http.post('/api/prize/register-new', data)
                		.then(function success(response) {
                            //success
                		}, function failure(response) {
                            //failure
                        	alert("failure message: " + JSON.stringify(response));
                        });
        }

        //register an article response: {subjectID, trial, articleID, likert}
        this.registerArticleResponse = function(articleResponse) {
            var data = angular.toJson(articleResponse);
            return $http.post('/api/article/register-response', data)
                		.then(function success(response) {
                            //success
                		}, function failure(response) {
                            //failure
                        	alert("failure message: " + JSON.stringify(response));
                        });
        }

        this.registerSpontaneousResponse = function(spontaneousResponse) {
            var data = angular.toJson(spontaneousResponse);
            return $http.post('/api/spontaneous/register-response', data)
                		.then(function success(response) {
                            //success
                		}, function failure(response) {
                            //failure
                        	alert("failure message: " + JSON.stringify(response));
                        });
        }

        this.getSpontaneousResponses = function(subjectID) {
            var data = angular.toJson(subjectID);
            return $http.post('/api/spontaneous/get-all-subject-responses', data)
                		.then(function success(response) {
                            //success
                			return response.data;
                		}, function failure(response) {
                            //failure
                        	alert("failure message: " + JSON.stringify(response));
                        });
        }
    }]);
