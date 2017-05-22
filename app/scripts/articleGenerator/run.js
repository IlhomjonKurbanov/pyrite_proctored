const values = require('./values');
const build = require('./functions');
const loremipsum = require('lorem-ipsum');

function randomSelect(values) {
    var index = Math.floor(Math.random() * values.length);
    return values[index];
}

function run() {
    var ID = 1;
    var page = '';
    page += build.navbar(ID);
    page += '<div id="page-content-' + ID + '">' //begin page content

    page += '</div>' //end page content
    console.log(page);
}
run();
