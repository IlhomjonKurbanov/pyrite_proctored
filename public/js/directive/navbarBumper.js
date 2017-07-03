// navbarBumper.js
// ===============
// for use with generated articles in articles view
// ------------------------------------------------
// used in tandem with 'navbarFixOnScroll' directive; sets an otherwise unstyled
// wrapper of the navbar to the navbar's calculated height -- this stays around
// when the navbar is flipped to fixed position to act as an upper bumper for the
// article text content
angular.module('pyrite')
    .directive('navbarBumper', function ($location) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                if ($location.path() == '/review') return;
                element.css('height', element.css('height'));
            }
        };
    })
