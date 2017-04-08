// SpontaneousResponse.js
// ======================
// Model for a spontaneous response to an article

angular.module('pyrite')
    .factory('SpontaneousResponse', function() {
        //constructor
        function SpontaneousResponse(articleID, pathToElement, value) {
            this.articleID = articleID;
            this.pathToElement = pathToElement;
            this.value = value;
            this.narrative = "";
        }

        //record the narrative response for the given spontaneous response
        SpontaneousResponse.prototype.submitNarrativeResponse = function(text) {
            //TODO
        }

        return SpontaneousResponse;
    });
