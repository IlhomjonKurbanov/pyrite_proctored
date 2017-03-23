angular.module('pyrite')
    .config(function($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');
        $routeProvider
            // start page
            .when('/', {
                templateUrl: 'view/start.html',
                controller: 'startController'
            })

            .when('/consent', {
                templateUrl: 'view/consent.html',
                controller: 'consentController'
            })

            // // articles page
            // .when('/articles', {
            //     templateUrl: 'view/articles.html',
            //     controller: 'articlesController'
            // })
            //
            // // narrative response page
            // .when('/narrative', {
            //     templateUrl: 'view/narrative.html',
            //     controller: 'narrativeController'
            // });

            //otherwise redirect to start page
            .otherwise('/');
    });
angular.module('pyrite')
    .run(['$rootScope', '$document', function($rootScope, $document) {
        $rootScope.$on("$routeChangeStart", function (event, currentRoute, previousRoute) {
            $document.scrollTopAnimated(0);
        });
    }]);
