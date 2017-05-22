var loremipsum = require('lorem-ipsum');

exports.navbar = function(ID) {
    var built = '';
    var items = loremipsum({
        count: 24,
        units: 'words',
        format: 'plain'
    }).split(' ');
    var itemsUsed = new Array();

    built += '<div class="navbar-background">';
    built += '<ul id="navbar-' + ID + '" class="navbar" ng-click="selectElement($event);$event.stopPropagation()">';

    var offset = 1;
    var item = '';
    var numItems = Math.floor(Math.random() * 5) + 4;
    for (var i = 1; i <= numItems; i++) {
        item = items[i - offset]
        if (item.length > 3 && itemsUsed.indexOf(item) == -1) {
            itemsUsed.push(item);
            built += '<li><a ng-click="selectElement($event);$event.stopPropagation()" id="navbar-element-' + ID + '-' + i + '">';
            built += item.charAt(0).toUpperCase() + item.slice(1);
            built += '</a></li>';
        } else {
            offset--;
            i--;
        }
    }

    built += '</ul>';
    built += '</div>';

    return built;
}

exports.title = function(ID) {
    var built = '';
    var title = loremipsum({
        count: 1,
        units: 'sentences',
        sentenceLowerBound: 4,
        sentenceUpperBound: 7,
        format: 'plain'
    });
    title = title.substring(0, title.length - 1).split(' ');
    title.forEach(function(currentValue, index, array) {
        if (currentValue.length > 3 || index == 0 || index == array.length - 1)
            array[index] = currentValue.charAt(0).toUpperCase() + currentValue.slice(1);
    });
    title = title.join(' ');

    built += '<h1 id="article-title-' + ID + '" ng-click="selectElement($event);$event.stopPropagation()">';
    built += title;
    built += '</h1>'

    return built;
}

exports.paragraph = function(ID, iteration, links) {
    //TODO
    loremipsum({
        count: 1,
        units: 'sentences',
        sentenceLowerBound: 5,
        sentenceUpperBound: 15,
        paragraphLowerBound: 3,
        paragraphUpperBound: 7,
        format: 'html'
    })
}
