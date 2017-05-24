const values     = require('./values');
const element    = require('./element');
const style      = require('./style');
const process    = require('./process');
const loremipsum = require('lorem-ipsum');
const fs         = require('fs');

function run() {
    var ID = 1;

    // == begin page, build navbar =============================================
    var page = '';
    page += element.navbar(ID);

    page += '<div id="page-content-' + ID + '">' //begin page content
    page += '<div id="article-start-' + ID + '">' // for centering beginning elements
    page += element.title(ID);

    // == build body text ======================================================
    var wordCount = process.randomSelect(values.attributeValues.wordCount); //prescribed wordCount
    var actualWordCount = 0; //actual word count
    var paragraphs = new Array();
    var returned;

    //build paragraphs until wordCount is exceeded
    for (var iteration = 1; actualWordCount < wordCount; iteration++) {
        returned = element.paragraph();
        actualWordCount += returned.wordCount;
        paragraphs.push(returned.paragraph);
    }

    //break paragraphs into groups of sentences and words, for adding links
    paragraphs = process.paragraphsToWords(paragraphs);

    //add links
    var linkRatio = process.randomSelect(values.attributeValues.linkRatio);
    var links = (linkRatio == -1) ? 0 : Math.round(actualWordCount / linkRatio);
    var linkIndexes = {};
    returned = element.links(ID, paragraphs, links);
    paragraphs = returned.data;

    //indexes where a link has been added, stored for later,
    //to ensure images aren't inserted into the middle of links
    var linkIndexes = returned.indexes;

    // == build body media =====================================================
    //establish video parameters
    var video = process.randomSelect(values.attributeValues.video);
    var videoPosition, videoPath; //undefined if video == VIDEO_CODE.absent
    if (video == values.VIDEO_CODE.follows) videoPosition = 'top';
    if (video == values.VIDEO_CODE.present) videoPosition = process.randomSelect(values.positions.videoPosition);
    if (video != values.VIDEO_CODE.absent) videoPath = process.randomSelect(values.videos);

    //establish image parameters
    var imageRatio = process.randomSelect(values.attributeValues.imageRatio);
    var images = (imageRatio == -1) ? 0 : Math.round(actualWordCount / imageRatio);
    var firstImagePosition;
    if (images > 0) {
        if (video == values.VIDEO_CODE.absent || videoPosition == 'middle') {
            firstImagePosition = process.randomSelect(values.positions.firstImagePosition);
        } else {
            firstImagePosition = 'middle';
        }
    }

    //assign video position
    var videoInjectIndex; //undefined if videoPosition == 'top';
    if (video != values.VIDEO_CODE.absent) {
        if (videoPosition == 'top') page += element.video(ID, videoPath);
        if (videoPosition == 'middle') videoInjectIndex = Math.floor(paragraphs.length / 2);
    }

    //assign image positions
    var imagePaths = process.shuffle(values.images);
    while (imagePaths.length > images) imagePaths.pop();
    if (firstImagePosition == 'top') {
        page += '<img ng-click="selectElement($event);$event.stopPropagation()" ';
        page += 'id="image-' + ID + '-' + images + '" src="' + imagePaths.pop() + '">';
    }
    paragraphs = element.images(ID, paragraphs, linkIndexes, images, firstImagePosition, imagePaths);

    // == construct body =======================================================
    //end article-start section -- images or videos positioned at 'top' are now added
    page += '</div>';

    //rebuild paragraphs
    paragraphs = process.wordsToParagraphs(paragraphs);

    //add paragraphs (with injected links, images, and videos) to body
    for (var i = 0; i < paragraphs.length; i++) {
        //add video to beginning of paragraph if appropriate
        if (videoPosition == 'middle' && videoInjectIndex == i) page += element.video(ID, videoPath);

        //add paragraph
        prepend = '<p id="paragraph-' + ID + '-' + i + '" ' + element.NGCLICK + '>'
        page += prepend + paragraphs[i] + '</p>';
    }

    page += '</div>'; //end page content

    // == build styles =========================================================
    var styles = '<style>'; // begin styles section

    //center elements (title, video, and image, if image is positioned at
    //beginning of article)
    styles += style.center(ID, video, values.VIDEO_CODE.absent, images, firstImagePosition);

    //wrapper styles
    styles += style.wrapper(ID);

    //font sizes
    styles += style.fontSize(ID, process.randomSelect(values.attributeValues.fontSize));

    //font face
    styles += style.fontFace(ID, process.randomSelect(values.attributeValues.serifP));

    //navbar
    styles += style.navbar(ID, process.randomSelect(values.navbarColors));

    //video height
    styles += style.videoHeight(ID, process.randomSelect(values.dimensions));

    //video 'follow on scroll'
    //TODO

    //image styling
    styles += style.globalImageStyling(ID);
    var imageWidths = new Array();
    for (var i = 0; i < images; i++) imageWidths.push(process.randomSelect(values.dimensions));
    var imageFloats = new Array();
    for (var i = 0; (firstImagePosition == 'top' && i < (images - 1) || i < images); i++) {
        imageFloats.push(process.randomSelect(values.positions.imageFloat));
    }
    styles += style.images(ID, images, imageWidths, imageFloats, firstImagePosition);

    styles += '</style>' //end styles section
    page = styles + page; //insert styles into beginning of page
    // == print to console and to 'output.html' ================================
    console.log(page);
    fs.writeFile('output.html', page, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Output was saved.");
    });
}
run();
