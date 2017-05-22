var loremipsum = require('lorem-ipsum');

exports.NGCLICK = 'ng-click="selectElement($event);$event.stopPropagation()"'

// == building functions (build article elements) ==============================
exports.navbar = function(ID) {
    var built = '';
    var items = loremipsum({
                    count: 24,
                    units: 'words',
                    format: 'plain'
                }).split(' ');
    var itemsUsed = new Array();

    built += '<div class="navbar-background">';
    built += '<ul id="navbar-' + ID + '" class="navbar" ' + this.NGCLICK + '>';

    var offset = 1;
    var item = '';
    var numItems = Math.floor(Math.random() * 5) + 4;
    for (var i = 1; i <= numItems; i++) {
        item = items[i - offset]
        if (item.length > 3 && itemsUsed.indexOf(item) == -1) {
            itemsUsed.push(item);
            built += '<li><a id="navbar-element-' + ID + '-' + i + '" ' + this.NGCLICK + '>';
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
    title.forEach(function(value, index, array) {
        if (value.length > 3 || index == 0 || index == array.length - 1)
            array[index] = value.charAt(0).toUpperCase() + value.slice(1);
    });
    title = title.join(' ');

    built += '<h1 id="article-title-' + ID + '" ' + this.NGCLICK + '>';
    built += title;
    built += '</h1>'

    return built;
}

// output: { wordCount: # of words, data: paragraph text}
exports.paragraph = function() {
    var data = {
        wordCount : 0,
        paragraph : ''
    }
    data.paragraph = loremipsum({
                         count: 1,
                         units: 'paragraphs',
                         sentenceLowerBound: 5,
                         sentenceUpperBound: 15,
                         paragraphLowerBound: 3,
                         paragraphUpperBound: 7,
                         format: 'plain'
                     });
    data.wordCount = data.paragraph.split(' ').length;
    return data;
}

// input: articleID; 3D array of words, grouped by sentences, paragraphs, and
//        entire page; number of links to add
// output: same array of words as has been input, with links (pairs of 'a' tags)
//         added randomly
exports.links = function(ID, paragraphs, links) {
    var paragraph, sentence, maxWords, numWords, beginIndex, prepend;
    var addedLinks = {}; //stores '2D array' of indexes where links have been added (addedLinks[paragraph][sentence])
    for (var i = 1; i <= links; i++) {
        var paragraph = Math.floor(Math.random() * paragraphs.length); //select a random paragraph
        var sentence = Math.floor(Math.random() * paragraphs[paragraph].length); //select a random sentence

        //if link has been added, skip link, otherwise store its index
        if (addedLinks.hasOwnProperty(paragraph)) {
            if (addedLinks[paragraph].indexOf(sentence) != -1) {
                i--;
                continue;
            } else {
                addedLinks[paragraph].push(sentence);
            }
        } else {
            addedLinks[paragraph] = [sentence];
        }

        //links can be 1 to 5 words
        numWords = Math.floor(Math.random() * 5) + 1;

        //beginIndex can be anywhere from beginning of sentence to sentence length - numWords
        beginIndex = Math.floor(Math.random() * (paragraphs[paragraph][sentence].length - numWords));

        //add link
        prepend = '<a id="link-' + ID + '-' + i + '" ' + this.NGCLICK + '>';
        paragraphs[paragraph][sentence][beginIndex] = prepend + paragraphs[paragraph][sentence][beginIndex];
        paragraphs[paragraph][sentence][beginIndex + numWords - 1] += '</a>'; //numWords - 1 means that end tag will be added to the correct index
    }
    return paragraphs;
}

// == processing functions =====================================================

// input: array of paragraphs
// output: 3d array, arrays of words grouped by sentences, then paragraphs (data[paragraph#][sentence#][word#])
exports.paragraphsToWords = function(data) {
    for (var i = 0; i < data.length; i++) {
        //split paragraphs into sentences
        data[i] = data[i].split('.');
        data[i].pop(); //drop trailing empty item

        //split sentences into words
        for (var j = 0; j < data[i].length; j++) {
            data[i][j] = data[i][j].trim().split(' ');
        }
    }
    return data;
}

// input: 3d array, arrays of words grouped by sentences, then paragraphs (data[paragraph#][sentence#][word#])
// output: array of paragraphs
exports.wordsToParagraphs = function(data) {
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
            data[i][j] = data[i][j].join(' ');
        }
        data[i] = data[i].join('. ') + '.';
    }
    return data;
}
