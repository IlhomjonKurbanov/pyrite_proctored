angular.module('pyrite')
    .service('resizeService', function() {
        this.origin = '';
        this.setOrigin = function(origin) {
            this.origin = origin;
        }
        this.getOrigin = function() {
            return this.origin;
        }
        this.getMinimums = function() {
            var minimum = {
                width : 1220,
                height : 400
            }
            return minimum;
        }
    });
