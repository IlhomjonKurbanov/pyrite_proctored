// ArticleResponse.js
// ==================
// Model for a response to an article. Contains fields for the articleID and the
// response to a likert scale

angular.module('pyrite')
    .factory('ArticleResponse', function() {
        //constructor
        function ArticleResponse(subjectID, articleID, response) {
            this.articleID = articleID;
            this.response = response;
        }

        return ArticleResponse;
    });
