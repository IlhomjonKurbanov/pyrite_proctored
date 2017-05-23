const values = require('./values');
const build = require('./functions');
const loremipsum = require('lorem-ipsum');

function randomSelect(values) {
    var index = Math.floor(Math.random() * values.length);
    return values[index];
}

function shuffle(array) {
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

function run() {
    var ID = 1;

    // == begin page, build navbar =============================================
    var page = '';
    page += build.navbar(ID);

    page += '<div id="page-content-' + ID + '">' //begin page content
    page += build.title(ID);

    // == build body text ======================================================
    var wordCount = randomSelect(values.attributeValues.wordCount); //prescribed wordCount
    var actualWordCount = 0; //actual word count
    var paragraphs = new Array();
    var returned;

    //build paragraphs until wordCount is exceeded
    for (var iteration = 1; actualWordCount < wordCount; iteration++) {
        returned = build.paragraph();
        actualWordCount += returned.wordCount;
        paragraphs.push(returned.paragraph);
    }

    //break paragraphs into groups of sentences and words, for adding links
    paragraphs = build.paragraphsToWords(paragraphs);

    //add links
    var linkRatio = randomSelect(values.attributeValues.linkRatio);
    var links = (linkRatio == -1) ? 0 : Math.round(actualWordCount / linkRatio);
    var linkIndexes = {};
    returned = build.links(ID, paragraphs, links);
    paragraphs = returned.data;

    //indexes where a link has been added, stored for later,
    //to ensure images aren't inserted into the middle of links
    var linkIndexes = returned.indexes;

    // == build body media =====================================================
    //establish video parameters
    var video = randomSelect(values.attributeValues.video);
    var videoPosition, videoPath; //undefined if video == VIDEO_CODE.absent
    if (video == values.VIDEO_CODE.follows) videoPosition = 'top';
    if (video == values.VIDEO_CODE.present) videoPosition = randomSelect(values.positions.videoPosition);
    if (video != values.VIDEO_CODE.absent) videoPath = randomSelect(values.videos);

    //establish image parameters
    var imageRatio = randomSelect(values.attributeValues.imageRatio);
    var images = (imageRatio == -1) ? 0 : Math.round(actualWordCount / imageRatio);
    var firstImagePosition;
    if (images > 0) {
        if (video == values.VIDEO_CODE.absent || videoPosition == 'middle') {
            firstImagePosition = randomSelect(values.positions.firstImagePosition);
        } else {
            firstImagePosition = 'middle';
        }
    }

    //assign video position
    var videoInjectIndex; //undefined if videoPosition == 'top';
    if (video != values.VIDEO_CODE.absent) {
        if (videoPosition == 'top') page += build.video(ID, videoPath);
        if (videoPosition == 'middle') videoInjectIndex = Math.floor(paragraphs.length / 2);
    }

    //assign image positions
    var imagePaths = shuffle(values.images);
    while (imagePaths.length > images) imagePaths.pop();
    if (firstImagePosition == 'top') {
        page += '<img ng-click="selectElement($event);$event.stopPropagation()" ';
        page += 'id="image-' + ID + '-' + images + '" src="' + imagePaths.pop() + '">';
    }
    var numImages = (firstImagePosition == 'top') ? images - 1 : images;
    paragraphs = build.images(ID, paragraphs, linkIndexes, numImages, imagePaths);

    //rebuild paragraphs
    paragraphs = build.wordsToParagraphs(paragraphs);

    //add paragraphs (with injected links, images, and videos) to body
    for (var i = 0; i < paragraphs.length; i++) {
        //add video to beginning of paragraph if appropriate
        if (videoPosition == 'middle' && videoInjectIndex == i) page += build.video(ID, videoPath);

        //add paragraph
        prepend = '<p id="paragraph-' + ID + '-' + i + '" ' + build.NGCLICK + '>'
        page += prepend + paragraphs[i] + '</p>';
    }

    page += '</div>'; //end page content
    console.log(page);
}
run();
