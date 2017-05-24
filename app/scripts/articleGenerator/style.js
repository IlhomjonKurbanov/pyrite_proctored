// style.js
// ========
// functions for building article styles

// create font size style
// ======================
// input: ID, fontSize object ({'article' : value, 'title' : value})
// output: styling for article text and article title
exports.fontSize = function(ID, fontSize) {
    //article text size
    var data = '#navbar-' + ID + ' li,#page-content-' + ID + ' p{';
    data += 'font-size:' + fontSize.article + 'px;}';

    //article title size
    data += '#page-content-' + ID + ' h1{';
    data += 'font-size:' + fontSize.title + 'px;}';
    return data;
}

// create font face style (serif or sans-serif)
exports.fontFace = function(ID, serifP) {
    var data = '#navbar-' + ID + ',#page-content-' + ID + '{';
    data += 'font-family:';
    data += (serifP) ? 'serif' : 'sans-serif';
    data += ';}';
    return data;
}
