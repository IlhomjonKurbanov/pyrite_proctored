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
    var wordCount = randomSelect(values.attributeValues.wordCount);
    console.log(wordCount);
    var paragraphs = new Array();
    var createdWordCount = 0;
    var returned;
    //build paragraphs until wordCount is exceeded
    for (var iteration = 1; createdWordCount < wordCount; iteration++) {
        returned = build.paragraph(ID, iteration, 0);
        createdWordCount += returned.wordCount;
        paragraphs.push(returned.paragraph);
    }
    paragraphs.forEach(function(value) {
        page += value;
    });

    page += '</div>' //end page content
    console.log(page);
}
run();
