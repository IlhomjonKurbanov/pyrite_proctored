const value = require('./values');
const build = require('./functions');
const loremipsum = require('lorem-ipsum');

function run() {
    var ID = 1;
    var page = '';
    page += build.navbar(ID);
    page += '<div id="page-content-' + ID + '">' //begin page content

    page += '</div>' //end page content
    console.log(page);
}
//TODO randomize number of navbar elements
// run();
build.title(1);
