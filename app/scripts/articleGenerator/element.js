// element.js
// ==========
// functions for building article elements

// dependencies & constants
var loremipsum = require('lorem-ipsum');
exports.NGCLICK = 'ng-click="selectElement($event);$event.stopPropagation()"'

// build navbar
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

// build article title
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

// build a paragraph
// =================
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

// add links to an object containing the article's words
// =====================================================
// input: articleID; 3D array of words, grouped by sentences, paragraphs, and
//        entire page; number of links to add
// output: same array of words as has been input, with links (pairs of 'a' tags)
//         added randomly
exports.links = function(ID, paragraphs, links) {
    var paragraph, sentence, maxWords, numWords, beginIndex, prepend;
    var linkIndexes = {}; //stores '2D array' of indexes where links have been added (linkIndexes[paragraph][sentence])
    for (var i = 1; i <= links; i++) {
        var paragraph = Math.floor(Math.random() * paragraphs.length); //select a random paragraph
        var sentence = Math.floor(Math.random() * paragraphs[paragraph].length); //select a random sentence

        //if link has been added at this index, skip an iteration of the loop,
        //otherwise store this index
        if (linkIndexes.hasOwnProperty(paragraph)) {
            if (linkIndexes[paragraph].indexOf(sentence) != -1) {
                i--;
                continue;
            } else {
                linkIndexes[paragraph].push(sentence);
            }
        } else {
            linkIndexes[paragraph] = [sentence];
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
    return {
        'data' : paragraphs,
        'indexes' : linkIndexes
    };
}

// build video element
exports.video = function(ID, videoPath) {
    var data = '<video id="article-video-' + ID + '" height="270" controls>';
    data += '<source src="' + videoPath + '" type="video/mp4">';
    data += 'Your browser does not support the video tag.</video>';
    return data;
}

// add images to an object containing the article's words
// ======================================================
// input: articleID; 3D array of words, grouped by sentences, paragraphs, and
//        entire page; 2D array of index where a link has already been added;
//        number of images to add; image paths
// output: same array of words as has been input, with images added randomly (at
//         the beginning of sentences)
exports.images = function(ID, paragraphs, linkIndexes, images, imagePaths) {
    var paragraph, sentence, imageEnd;
    var imageStart = '<img ' + this.NGCLICK + ' ';
    var imageIndexes = new Array();
    for (var i = 1; i <= images; i++) {
        var paragraph = Math.floor(Math.random() * paragraphs.length); //select a random paragraph
        var sentence = Math.floor(Math.random() * paragraphs[paragraph].length); //select a random sentence

        //if an images has already been added to this paragraph, skip an iteration
        //of the loop, otherwise store index
        if (imageIndexes.indexOf(paragraph) != -1) {
            i--;
            continue;
        } else {
            imageIndexes.push(paragraph);
        }

        //if link has already been added to this sentence, pick a new sentence
        if (linkIndexes.hasOwnProperty(paragraph)) {
            while (linkIndexes[paragraph].indexOf(sentence) != -1) {
                sentence = Math.floor(Math.random() * paragraphs[paragraph].length); //select a random sentence
            }
        }

        //add image
        imageEnd = 'id="image-' + ID + '-' + i + '" src="' + imagePaths.pop() + '">';
        paragraphs[paragraph][sentence][0] = imageStart + imageEnd + paragraphs[paragraph][sentence][0];;
    }
    return paragraphs;
}
