angular.module('pyrite')
    .service('articleService', ['appConfig', 'articlesConfig', function(appConfig, articlesConfig) {
        this.getNumTrials = function() {
            return articlesConfig.NUMBER_OF_TRIALS;
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
            var block = articlesConfig.NUMBER_OF_ARTICLES / (articlesConfig.ATTRIBUTE_VALUES.linkDensity.length * articlesConfig.ATTRIBUTE_VALUES.video.length * articlesConfig.ATTRIBUTE_VALUES.images.length);
            for (i = 1; i < articlesConfig.NUMBER_OF_ARTICLES; i += block) {
                var index = Math.floor(Math.random() * block) + i;
                var ID = articlesConfig.ARTICLE_PATHS[index];
                order.push(ID);
            }
            order = this.shuffle(order);
            return order;
        }
    }]);
