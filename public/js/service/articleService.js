angular.module('pyrite')
    .service('articleService', ['appConfig', 'articlesConfig', function(appConfig, articlesConfig) {
        //TODO build details
            //bunch of nested loops to generate all combinations
            //uses articleDetails.ARTICLE_ATTRIBUTES values as indexes for larger 'details' object

        this.getNumArticles = function() {
            return articlesConfig.NUMBER_OF_ARTICLES;
        }

        this.shuffle = function(array) {
            var currentIndex = array.length;
            var temporaryValue, randomIndex;
            while (0 !== currentIndex) {
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }

        this.getNewArticleOrder = function() {
            var order = new Array();
            for (i = 0; i < articlesConfig.NUMBER_OF_ARTICLES; i++) {
                order.push(i);
            }
            order = this.shuffle(order);
            return order;
        }

        this.getArticleDetails = function(articleID) {
            //TODO return details
        }
    }]);
