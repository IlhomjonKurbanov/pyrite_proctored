// define our application and pull in ngRoute and ngAnimate
var pyrite = angular.module('pyrite', ['ngRoute', 'ngAnimate']);

// ROUTING ===============================================
// set our routing for this application
// each route will pull in a different controller
pyrite.config(function($routeProvider) {
    $routeProvider
        // start page
        .when('/', {
            templateUrl: 'view/page-start.html',
            controller: 'startController'
        })

        // articles page
        .when('/articles', {
            templateUrl: 'view/page-articles.html',
            controller: 'articlesController'
        })

        // narrative response page
        .when('/response', {
            templateUrl: 'view/page-response.html',
            controller: 'responseController'
        });

});


// CONTROLLERS ============================================
// start page controller
pyrite.controller('startController', function($scope) {
    $scope.pageClass = 'page-start';
});

// articles page controller
pyrite.controller('articlesController', function($scope) {
    $scope.pageClass = 'page-articles';
});

// narrative response page controller
pyrite.controller('responseController', function($scope) {
    $scope.pageClass = 'page-response';
});
