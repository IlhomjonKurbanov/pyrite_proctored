const values = require('./values');
const build = require('./functions');
const loremipsum = require('lorem-ipsum');

function randomSelect(values) {
    var index = Math.floor(Math.random() * values.length);
    return values[index];
}

function run() {
    var ID = 1;

    // == begin page, build navbar =============================================
    var page = '';
    page += build.navbar(ID);

    page += '<div id="page-content-' + ID + '">' //begin page content

    // == build body text ======================================================
    var wordCount = randomSelect(values.attributeValues.wordCount); //prescribed wordCount
    var paragraphsTotalWordCount = 0; //actual word count
    var paragraphs = new Array();
    var returned;

    //build paragraphs until wordCount is exceeded
    for (var iteration = 1; paragraphsTotalWordCount < wordCount; iteration++) {
        returned = build.paragraph();
        paragraphsTotalWordCount += returned.wordCount;
        paragraphs.push(returned.paragraph);
    }

    //update wordCount to actual word count, for brevity in later code
    wordCount = paragraphsTotalWordCount;

    //break paragraphs into groups of sentences and words, for adding links
    paragraphs = build.paragraphsToWords(paragraphs);

    //add links
    var linkRatio = randomSelect(values.attributeValues.linkRatio);
    var links = (linkRatio == -1) ? 0 : Math.round(wordCount / linkRatio);
    paragraphs = build.links(ID, paragraphs, links);

    //rebuild paragraphs
    paragraphs = build.wordsToParagraphs(paragraphs);

    //testing: add to body
    //TODO: intersperse with images, video
    for (var i = 0; i < paragraphs.length; i++) {
        prepend = '<p id="paragraph-' + ID + '-' + i + '" ' + build.NGCLICK + '>'
        page += prepend + paragraphs[i] + '<p>';
    }

    page += '</div>'; //end page content
    console.log(page);
}
run();
