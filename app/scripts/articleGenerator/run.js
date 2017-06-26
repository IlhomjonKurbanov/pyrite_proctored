const values     = require('./values');
const element    = require('./element');
const style      = require('./style');
const process    = require('./process');
const loremipsum = require('lorem-ipsum');
const fs         = require('fs');

// 'global' variables:
// =============================================================================
// page             : html string for the entire page
// navbarP          : 0=static, 1=fixed navbar
// wordCount        : prescribed word count
// actualWordCount  : actual word count due to randomized lorem ipsum generation
// paragraphs       : array of paragraphs, which gets expanded into 3d array of words,
//                    grouped by sentence and paragraph
// linkRatio        : words per link, -1 if no links
// links            : number of links
// video            : 0=absent, 1=present, 2=follows on scroll
// videoLocation    : 'top' or 'middle'
// videoInjectIndex : index where video is added to text body, if videoLocation == 'middle'
// images           : number of images
// imageData        : associative array of indices and image html strings, for
//                    injecting into image body between paragraphs
// styles           : html string containing all page styles

function run() {
    var ID = 1;

    // == begin page, build navbar =============================================
    var page = '<script>plyr.setup()</script>';
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
    paragraphs = element.links(ID, paragraphs, links);

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
    var images = process.randomSelect(values.attributeValues.images);

    //assign image positions
    var imagePaths = process.shuffle(values.images);
    while (imagePaths.length > images) imagePaths.pop();
    var imageData = element.images(ID, images, imagePaths, paragraphs.length, videoLocation, videoInjectIndex);

    // == construct body =======================================================
    //end article-start section -- images or videos positioned at 'top' are now added
    page += '</div>';

    //rebuild paragraphs
    paragraphs = process.wordsToParagraphs(paragraphs);

    //add paragraphs (with injected links, images, and videos) to body
    var prepend;
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
        var imageHeights = new Array();
        for (var i = 0; i < images; i++) imageHeights.push(process.randomSelect(values.dimensions));
        styles += style.images(ID, images, imageHeights);
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
