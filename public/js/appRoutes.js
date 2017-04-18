// appRoutes.js
// ============
// front-end routing, defines controllers & templates for views

angular.module('pyrite')
    .config(function($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');
        $routeProvider
            // start page
            .when('/', {
                templateUrl: 'view/start.html',
                controller: 'startController'
            })

            // consent page
            .when('/consent', {
                templateUrl: 'view/consent.html',
                controller: 'consentController'
            })

            // introduction page
            .when('/introduction', {
                templateUrl: 'view/introduction.html',
                controller: 'introductionController'
            })

            // articles page
            .when('/articles/:index', {
                templateUrl: 'view/articles.html',
                controller: 'articlesController'
            })

            // review spontaneous responses page
            .when('/review', {
                templateUrl: 'view/review.html',
                controller: 'reviewController'
            })

            // prize drawing page
            .when('/prize', {
                templateUrl: 'view/prize.html',
                controller: 'prizeController'
            })

            //otherwise redirect to start page
            .otherwise('/');
    });
//handles routing behavior: scroll to top on route change, and subject consent validation
angular.module('pyrite')
    .run(['$rootScope', '$document', '$location', '$cookies', 'appConfig',
        function($rootScope, $document, $location, $cookies, appConfig) {
            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                if (appConfig.DO_CONSENT_REDIRECT && $cookies.get('hasConsented') == undefined) {
                    // if hasn't consented, return to start page, unless accessing consent/start page
                    if (next.templateUrl != 'view/start.html' && next.templateUrl != 'view/consent.html') {
                        //if not going to start or consent page, redirect to start
                        $location.path('/');
                    }
                }
                $document.scrollTopAnimated(0);
            });
        }]);
