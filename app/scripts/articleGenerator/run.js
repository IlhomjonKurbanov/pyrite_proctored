const values     = require('./values');
const element    = require('./element');
const style      = require('./style');
const util       = require('./util');
const loremipsum = require('lorem-ipsum');
const fs         = require('fs');
const mkdirp     = require('mkdirp');

// == MAIN =====================================================================
var arg = process.argv[2];
if (arg == 'all') {
    runAll();
} else if (arg == 'directories') {
    buildDirectories();
} else {
    run(arg);
}

// == FUNCTIONS ================================================================
//build directories for most important attributes
function buildDirectories() {
    var i_linkDensity, i_video, i_images;
    var attr = values.attributeValues;

    for (i_linkDensity = 0; i_linkDensity < attr.linkDensity.length; i_linkDensity++) {
        mkdirp('articles/' + i_linkDensity + '/', function (err) {
            if (err) console.error(err)
            else console.log('success')
        });

        for (i_video = 0; i_video < attr.video.length; i_video++) {
            mkdirp('articles/' + i_linkDensity + '/' + i_video + '/', function (err) {
                if (err) console.error(err)
                else console.log('success')
            });

            for (i_images = 0; i_images < attr.images.length; i_images++) {
                mkdirp('articles/' + i_linkDensity + '/' + i_video + '/' + i_images + '/', function (err) {
                    if (err) console.error(err)
                    else console.log('success')
                });
            }
        }
    }
}
// RUNALL ====
function runAll() {
    // == script variables =====================================================
    var ID;
    var i_linkDensity, i_video, i_images, i_wordCount, i_fontSize, i_serifP, i_navbarP;
    var attr = values.attributeValues;

    var i = 1;
    var articlePaths = new Array();
    // == variable iteration loop ==============================================
    //establish linkDensity
    for (i_linkDensity = 0; i_linkDensity < attr.linkDensity.length; i_linkDensity++) {
        //establish video
        for (i_video = 0; i_video < attr.video.length; i_video++) {
            //establish images
            for (i_images = 0; i_images < attr.images.length; i_images++) {
                //establish wordCount
                for (i_wordCount = 0; i_wordCount < attr.wordCount.length; i_wordCount++) {
                    //establish fontSize
                    for (i_fontSize = 0; i_fontSize < attr.fontSize.length; i_fontSize++) {
                        //establish serifP
                        for (i_serifP = 0; i_serifP < attr.serifP.length; i_serifP++) {
                            //establish navbarP
                            for (i_navbarP = 0; i_navbarP < attr.navbarP.length; i_navbarP++) {
                                //establish videoLocation
                                for (i_videoLocation = 0; i_videoLocation < attr.videoLocation.length; i_videoLocation++) {
                                    ID = i_linkDensity + '-' + i_video + '-' + i_images + '-' + i_wordCount + '-' + i_fontSize + '-' + i_serifP + '-' + i_navbarP + '-' + i_videoLocation;
                                    console.log('Generating Article: ' + ID);
                                    articlePaths.push(run(ID));
                                    // for generating all IDs for storage in articlesConfig
                                    // console.log('"' + i + '" : "' + ID + '",');
                                    // i++;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
//     i = 1;
//     articlePaths.forEach(function(cur, index, arr) {
//         console.log('"' + i + '" : "' + cur + '",');
//         i++;
//     })
}

// RUN ====
function run(ID) {
    // 'global' variables:
    // =============================================================================
    // page             : html string for the entire page
    // navbarP          : 0=static, 1=fixed navbar
    // wordCount        : prescribed word count
    // actualWordCount  : actual word count due to randomized lorem ipsum generation
    // paragraphs       : array of paragraphs, which gets expanded into 3d array of words,
    //                    grouped by sentence and paragraph
    // linkDensity      : links per word
    // links            : number of links
    // video            : 0=absent, 1=present, 2=follows on scroll
    // videoLocation    : 0=top, 1=middle
    // videoInjectIndex : index where video is added to text body, if videoLocation == 'middle'
    // images           : number of images
    // imageData        : associative array of indices and image html strings, for
    //                    injecting into image body between paragraphs
    // styles           : html string containing all page styles

    // == get article parameters from ID =======================================
    var test = (ID == 'test');
    var params;
    if (test) {
        console.log('TEST: random values.');
    } else {
        params = ID.split('-');
        var av = values.attributeValues;

        //set article attributes
        var linkDensity   = av.linkDensity[params[0]];
        var video         = av.video[params[1]];
        var images        = av.images[params[2]];
        var wordCount     = av.wordCount[params[3]];
        var fontSize      = av.fontSize[params[4]];
        var serifP        = av.serifP[params[5]];
        var navbarP       = av.navbarP[params[6]];
        var videoLocation = av.videoLocation[params[7]];
        //console.log(linkDensity + ', ' + video + ', ' + images + ', ' + wordCount + ', ' + fontSize + ', ' + serifP + ', ' + navbarP + ', ' + videoLocation)
    }


    // == begin page, build navbar =============================================
    var page = '<script>plyr.setup()</script>';
    if (test) var navbarP = util.randomSelect(values.attributeValues.navbarP);
    page += element.navbar(ID, navbarP);

    page += '<div id="page-content_' + ID + '">' //begin page content
    page += '<div id="article-start_' + ID + '">' // for centering beginning elements
    page += element.title(ID);

    // == build body text ======================================================
    if (test) var wordCount = util.randomSelect(values.attributeValues.wordCount); //prescribed wordCount
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
    paragraphs = util.paragraphsToWords(paragraphs);

    //add links
    if (test) var linkDensity = util.randomSelect(values.attributeValues.linkDensity);
    var links = Math.round(actualWordCount * linkDensity);
    paragraphs = element.links(ID, paragraphs, links);

    // == build body media =====================================================
    //establish video parameters
    if (test) var video = util.randomSelect(values.attributeValues.video);
    var videoPath; //undefined if video == VIDEO_CODE.absent
    //if (video == values.VIDEO_CODE.follows) videoLocation = 'top';
    if (video == values.VIDEO_CODE.present)  {
        if (test) var videoLocation = util.randomSelect(values.attributeValues.videoLocation);
        videoPath = util.randomSelect(values.videos);
    }


    //assign video position
    var videoInjectIndex; //undefined if videoLocation == 'top';
    if (video != values.VIDEO_CODE.absent) {
        if (videoLocation == values.VIDEO_LOC_CODE.top) page += element.video(ID, videoPath, videoLocation);
        if (videoLocation == values.VIDEO_LOC_CODE.middle) videoInjectIndex = Math.floor(paragraphs.length / 2);
    }

    //establish image parameters
    if (test) var images = util.randomSelect(values.attributeValues.images);

    //assign image positions
    var imagePaths = util.shuffle(values.images);
    while (imagePaths.length > images) imagePaths.pop();
    var imageData = element.images(ID, images, imagePaths, paragraphs.length, videoLocation, videoInjectIndex);

    // == construct body =======================================================
    //end article-start section -- images or videos positioned at 'top' are now added
    page += '</div>';

    //rebuild paragraphs
    paragraphs = util.wordsToParagraphs(paragraphs);

    //add paragraphs (with injected links, images, and videos) to body
    var prepend;
    for (var i = 0; i < paragraphs.length; i++) {
        //add video to beginning of paragraph if appropriate
        if (videoLocation == values.VIDEO_LOC_CODE.middle && videoInjectIndex == i) page += element.video(ID, videoPath, videoLocation);

        if (imageData[i] != undefined) page += imageData[i];

        //add paragraph
        prepend = '<p id="paragraph_' + ID + '_' + i + '" ' + element.NGCLICK + '>'
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
    styles += style.fontSize(ID, (test) ? util.randomSelect(values.attributeValues.fontSize) : fontSize);

    //font face
    styles += style.fontFace(ID, (test) ? util.randomSelect(values.attributeValues.serifP) : serifP);

    //links
    styles += style.links(ID);

    //navbar
    styles += style.navbar(ID, util.randomSelect(values.navbarColors), navbarP);

    //video
    if (video != values.VIDEO_CODE.absent) {
        styles += style.video(ID, util.randomSelect(values.dimensions));
    }

    //video 'follow on scroll'
    //TODO

    //image styling
    if (images > 0) {
        styles += style.globalImageStyling(ID);
        var imageHeights = new Array();
        for (var i = 0; i < images; i++) imageHeights.push(util.randomSelect(values.dimensions));
        styles += style.images(ID, images, imageHeights);
    }

    styles += '</style>' //end styles section
    page = styles + page; //insert styles into beginning of page

    // == print to 'output.html' ===============================================
    var filename = (test) ? 'article_' + ID + '.html' : 'articles/' + params[0] + '/' + params[1] + '/' + params[2] + '/article_' + ID + '.html';
    fs.writeFile(filename, page, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log(filename + ' was saved.');
    });
    return filename;
}
