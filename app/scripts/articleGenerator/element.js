// element.js
// ==========
// functions for building article elements

// dependencies & constants
var loremipsum = require('lorem-ipsum');
exports.NGCLICK = 'ng-click="selectElement($event);$event.stopPropagation()"'

// build navbar
// ============
// if navbarP = 0 (false), navbar is static. if navbarP = 1 (true), navbar is fixed
exports.navbar = function(ID, navbarP) {
    var built = '';
    var items = loremipsum({
                    count: 24,
                    units: 'words',
                    format: 'plain'
                }).split(' ');
    var itemsUsed = new Array();

    built += '<div ';
    if (navbarP) built += 'navbar-fix-on-scroll ' //add directive to handle fixed-position logic
    built += 'id="navbar-background-' + ID + '">';
    built += '<ul id="navbar-' + ID + '" class="navbar" ' + this.NGCLICK + '>';

    var offset = 1;
    var item = '';
    var numItems = Math.floor(Math.random() * 4) + 4;
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

    //add wrapper w/ directive to handle fixed-position logic
    if (navbarP) built = '<div navbar-bumper>' + built + '</div>'

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
                         sentenceLowerBound: 8,
                         sentenceUpperBound: 15,
                         paragraphLowerBound: 5,
                         paragraphUpperBound: 9,
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
        prepend = '<a id="link-' + ID + '-' + i + '" ' + this.NGCLICK + ' href="">';
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
    var data = '<video id="video-' + ID + '" controls>';
    data += '<source src="' + videoPath + '" type="video/mp4">';
    data += 'Your browser does not support the video tag.</video>';
    return data;
}

// generate an object indicating where images should be added to an article
// input: articleID, number of images, file paths for images, number of paragraphs,
//        image positioning (full-width or left-floated), location of video ('top'
//        or 'middle', undefined if no video), index of injected video if location
//        of video is 'middle' (undefined otherwise)
// output: an object w/ image location indexes as keys, and image html strings as
//         values (undefined if no image at this position)
exports.images = function(ID, images, imagePaths, paragraphs, imagePositioning, videoLocation, videoInjectIndex) {
    //TODO remove firstImageLocation from everywhere
    var data = {};
    var options = [true, false];
    var allowZeroIndex = (videoLocation != 'top')
    if (imagePositioning == 'full') paragraphs++; //allows for full-width images to happen after article end
    for (var i = 0; i < paragraphs; i++) {
        data[i] = undefined;
    }

    var imageStart = '<img ' + this.NGCLICK + ' ';
    var imageEnd;
    var imageWrapper = (imagePositioning == 'full') ? {'begin':'<div class="text-center">','end':'</div>'} : {'begin':'','end':''};

    if (images >= Math.round(paragraphs / 2)) {
        //if # images exceeds available indices (half of indices, because
        //neighboring indices may not be populated), put images in non-randomly,
        //to avoid time-consuming looping to place last few images
        var startIndex;
        if (videoInjectIndex == undefined) {
            //video is absent or positioned at 'top'
            startIndex = (allowZeroIndex) ? Math.round(Math.random()) : 1
        } else {
            //video is somewhere in middle, space out images accordingly
            startIndex = (videoInjectIndex % 2 == 0) ? 0 : 1;
            if (videoLocation == 'middle') images--; //otherwise it can loop endlessly
        }
        var imageID = 1;
        for (var i = startIndex; i < paragraphs; i += 2) {
            if (videoInjectIndex == i) continue;
            imageEnd = 'id="image-' + ID + '-' + imageID + '" src="' + imagePaths.pop() + '">';
            data[i] = imageWrapper['begin'] + imageStart + imageEnd + imageWrapper['end'];
            imageID++;
        }
    } else {
        //else, do normal loop w/ random positioning
        var rechoose = 0;
        for (var i = 1; i <= images; i++) {
            if (rechoose == 30) break; //avoid infinite loops
            var index = Math.floor(Math.random() * paragraphs);

            //if an image or video has been stored at this or an adjacent index, pick a new index
            if (data[index] != undefined
             || data[index - 1] != undefined
             || data[index + 1] != undefined
             || (!allowZeroIndex && index == 0)
             || index == videoInjectIndex
             || index + 1 == videoInjectIndex
             || index - 1 == videoInjectIndex) {
                rechoose++;
                i--;
                continue;
            }
            rechoose = 0;

            imageEnd = 'id="image-' + ID + '-' + i + '" src="' + imagePaths.pop() + '">';
            data[index] = imageWrapper['begin'] + imageStart + imageEnd + imageWrapper['end'];
        }
    }
    return data;
}
