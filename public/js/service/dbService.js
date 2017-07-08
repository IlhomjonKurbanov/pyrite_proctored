angular.module('pyrite')
    .service('dbService', ['$http', function($http) {
        //register a subject:
        this.registerNewSubject = function(subject) {
            var data = angular.toJson(subject);
            return $http.post('/api/subject/register-new', data)
                		.then(function success(response) {
                            //success
                			return response.data.subjectID;
                		}, function failure(response) {
                            //failure
                        	console.log("failure message: " + JSON.stringify(response));
                        });
        }

        //register an email address
        this.registerPrizeDrawingParticipant = function(email) {
            var data = angular.toJson(email);
            return $http.post('/api/prize/register-new', data)
                		.then(function success(response) {
                            //success
                		}, function failure(response) {
                            //failure
                        	console.log("failure message: " + JSON.stringify(response));
                        });
        }

        //register an article response
        this.registerArticleResponse = function(articleResponse) {
            var data = angular.toJson(articleResponse);
            return $http.post('/api/article/register-response', data)
                		.then(function success(response) {
                            //success
                		}, function failure(response) {
                            //failure
                        	console.log("failure message: " + JSON.stringify(response));
                        });
        }

        //register a spontaneous response
        this.registerSpontaneousResponse = function(spontaneousResponse) {
            var data = angular.toJson(spontaneousResponse);
            return $http.post('/api/spontaneous/register-response', data)
                		.then(function success(response) {
                            //success
                            return response.data.SRID;
                		}, function failure(response) {
                            //failure
                        	console.log("failure message: " + JSON.stringify(response));
                        });
        }

        //delete a spontaneous response
        this.deleteSpontaneousResponse = function(SRID) {
            var data = angular.toJson(SRID);
            return $http.post('/api/spontaneous/delete', data)
                		.then(function success(response) {
                            //success
                		}, function failure(response) {
                            //failure
                        	console.log("failure message: " + JSON.stringify(response));
                        });
        }

        //register a narrative response to a spontaneous response
        this.registerNarrativeResponse = function(narrativeResponse) {
            var data = angular.toJson(narrativeResponse);
            return $http.post('/api/narrative/register-response', data)
                		.then(function success(response) {
                            //success
                		}, function failure(response) {
                            //failure
                        	console.log("failure message: " + JSON.stringify(response));
                        });
        }
    }]);
