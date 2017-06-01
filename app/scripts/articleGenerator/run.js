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
    var navbarP = process.randomSelect(values.attributeValues.navbarP);
    page += element.navbar(ID, navbarP);

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
    var videoLocation, videoPath; //undefined if video == VIDEO_CODE.absent
    if (video == values.VIDEO_CODE.follows) videoLocation = 'top';
    if (video == values.VIDEO_CODE.present) videoLocation = process.randomSelect(values.videoLocation);
    if (video != values.VIDEO_CODE.absent) videoPath = process.randomSelect(values.videos);

    //assign video position
    var videoInjectIndex; //undefined if videoLocation == 'top';
    if (video != values.VIDEO_CODE.absent) {
        if (videoLocation == 'top') page += element.video(ID, videoPath, videoLocation);
        if (videoLocation == 'middle') videoInjectIndex = Math.floor(paragraphs.length / 2);
    }

    //establish image parameters
    var imageRatio = process.randomSelect(values.attributeValues.imageRatio);
    var images = (imageRatio == -1) ? 0 : Math.round(actualWordCount / imageRatio);
    imagePositioning = (Math.random() <= 0.85) ? 'full' : 'left';

    //assign image positions
    var imagePaths = process.shuffle(values.images);
    while (imagePaths.length > images) imagePaths.pop();
    var imageData = element.images(ID, images, imagePaths, paragraphs.length, imagePositioning, videoLocation, videoInjectIndex);

    // == construct body =======================================================
    //end article-start section -- images or videos positioned at 'top' are now added
    page += '</div>';

    //rebuild paragraphs
    paragraphs = process.wordsToParagraphs(paragraphs);

    //add paragraphs (with injected links, images, and videos) to body
    for (var i = 0; i < paragraphs.length; i++) {
        //add video to beginning of paragraph if appropriate
        if (videoLocation == 'middle' && videoInjectIndex == i) page += element.video(ID, videoPath, videoLocation);

        if (imageData[i] != undefined) page += imageData[i];

        //add paragraph
        prepend = '<p id="paragraph-' + ID + '-' + i + '" ' + element.NGCLICK + '>'
        page += prepend + paragraphs[i] + '</p>';
    }

    page += '</div>'; //end page content

    // == build styles =========================================================
    var styles = '<style>'; // begin styles section

    //center elements (title, video, and image, if image is positioned at
    //beginning of article)
    styles += style.center(ID);

    //wrapper styles
    styles += style.wrapper(ID);

    //font sizes
    styles += style.fontSize(ID, process.randomSelect(values.attributeValues.fontSize));

    //font face
    styles += style.fontFace(ID, process.randomSelect(values.attributeValues.serifP));

    //navbar
    styles += style.navbar(ID, process.randomSelect(values.navbarColors), navbarP);

    //video
    if (video != values.VIDEO_CODE.absent) {
        styles += style.video(ID, process.randomSelect(values.dimensions));
    }

    //video 'follow on scroll'
    //TODO

    //image styling
    if (images > 0) {
        styles += style.globalImageStyling(ID);
        var imageWidths = new Array();
        if (imagePositioning == 'left') {
            for (var i = 0; i < images; i++) imageWidths.push(process.randomSelect(values.dimensions));
        }
        styles += style.images(ID, images, imageWidths);
    }

    styles += '</style>' //end styles section
    page = styles + page; //insert styles into beginning of page
    // == print to 'output.html' ===============================================
    fs.writeFile('output.html', page, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Output was saved.");
    });
}
run();
